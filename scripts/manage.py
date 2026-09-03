#!/usr/bin/env python3
"""Install and verify Anthony's managed global instruction and skill files."""

from __future__ import annotations

import argparse
import hashlib
import re
import shutil
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HOME_DIR = Path.home()
SHARED = ROOT / "AGENTS.md"
CLAUDE_SOURCE = ROOT / "CLAUDE.md"
SKILLS = tuple(sorted((ROOT / "skills").glob("*/SKILL.md")))


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def atomic_write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as handle:
        handle.write(data)
        temporary = Path(handle.name)
    temporary.replace(path)


def claude_bytes() -> bytes:
    source = CLAUDE_SOURCE.read_text()
    marker = "## Claude-specific additions"
    if marker not in source:
        raise ValueError(f"missing {marker!r} in {CLAUDE_SOURCE}")
    additions = source[source.index(marker) :]
    return (SHARED.read_text().rstrip() + "\n\n" + additions.strip() + "\n").encode()


def claude_skill_bytes(source: Path) -> bytes:
    text = source.read_text()
    if not text.startswith("---\n") or "\n---\n" not in text[4:]:
        raise ValueError(f"invalid frontmatter in {source}")
    end = text.index("\n---\n", 4)
    frontmatter = text[4:end]
    metadata = source.parent / "agents" / "openai.yaml"
    policy = re.search(
        r"(?m)^\s*allow_implicit_invocation:\s*(true|false)\s*$",
        metadata.read_text() if metadata.exists() else "",
    )
    # Preserve the supplied activation policy; only explicit-only sources need
    # Claude's adapter field. Existing frontmatter always takes precedence.
    explicit_only = policy is not None and policy.group(1) == "false"
    if explicit_only and "disable-model-invocation:" not in frontmatter:
        frontmatter += "\ndisable-model-invocation: true"
    return ("---\n" + frontmatter + text[end:]).encode()


def skill_files(source: Path, runtime: str) -> tuple[tuple[bytes, Path], ...]:
    """Render every canonical skill file for one runtime."""
    name = source.parent.name
    target_root = HOME_DIR / (".agents/skills" if runtime == "Codex" else ".claude/skills") / name
    rendered: list[tuple[bytes, Path]] = []
    for item in sorted(source.parent.rglob("*")):
        if not item.is_file() or "__pycache__" in item.parts or item.name == ".DS_Store":
            continue
        relative = item.relative_to(source.parent)
        if runtime == "Claude" and relative == Path("agents/openai.yaml"):
            continue
        data = claude_skill_bytes(source) if runtime == "Claude" and relative == Path("SKILL.md") else item.read_bytes()
        rendered.append((data, target_root / relative))
    return tuple(rendered)


def backup_file(path: Path, backup_root: Path) -> None:
    if path.exists():
        relative = str(path).replace(str(HOME_DIR), "home", 1).lstrip("/")
        destination = backup_root / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, destination)


def backup_directory(path: Path, backup_root: Path) -> None:
    if path.exists():
        relative = str(path).replace(str(HOME_DIR), "home", 1).lstrip("/")
        shutil.copytree(path, backup_root / relative)


def install(apply: bool) -> int:
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    backup_root = ROOT / "backups" / timestamp
    file_targets = (
        (SHARED.read_bytes(), HOME_DIR / ".codex" / "AGENTS.md", "Codex instructions"),
        (claude_bytes(), HOME_DIR / ".claude" / "CLAUDE.md", "Claude Code instructions"),
    )
    operations: list[tuple[bytes, Path, str, bool]] = []
    for data, target, label in file_targets:
        changed = not target.exists() or target.read_bytes() != data
        operations.append((data, target, label, changed))
    for skill_source in SKILLS:
        name = skill_source.parent.name
        for runtime in ("Codex", "Claude"):
            for data, target in skill_files(skill_source, runtime):
                label = f"{runtime} skill {name}: {target.relative_to(target.parents[1])}"
                changed = not target.exists() or target.read_bytes() != data
                operations.append((data, target, label, changed))

    for _, target, label, changed in operations:
        print(f"{'UPDATE' if changed else 'CURRENT'} {label}: {target}")
    if not apply:
        print("DRY RUN: pass --apply to make the listed updates")
        return 0

    changed_operations = [item for item in operations if item[3]]
    skill_roots: set[Path] = set()
    for _, target, _, _ in changed_operations:
        for base in (HOME_DIR / ".agents" / "skills", HOME_DIR / ".claude" / "skills"):
            if target.is_relative_to(base):
                skill_roots.add(base / target.relative_to(base).parts[0])
                break
        else:
            backup_file(target, backup_root)
    for skill_root in sorted(skill_roots):
        backup_directory(skill_root, backup_root)
    for data, target, _, changed in operations:
        if changed:
            atomic_write(target, data)
    if backup_root.exists():
        print(f"BACKUP {backup_root}")
    print(f"APPLIED {len(changed_operations)} managed file(s)")
    return 0


def parse_name(path: Path) -> str:
    text = path.read_text()
    match = re.search(r"(?m)^name:\s*([a-z0-9-]+)\s*$", text)
    if not match:
        raise ValueError(f"missing valid skill name in {path}")
    return match.group(1)


def verify() -> int:
    failures: list[str] = []
    checks = (
        (SHARED.read_bytes(), HOME_DIR / ".codex" / "AGENTS.md", "Codex instructions"),
        (claude_bytes(), HOME_DIR / ".claude" / "CLAUDE.md", "Claude instructions"),
    )
    for expected, target, label in checks:
        actual = target.read_bytes() if target.exists() else b""
        status = "PASS" if expected == actual else "FAIL"
        print(f"{status} {label}: {target}")
        if status == "FAIL":
            failures.append(label)
    for source in SKILLS:
        name = parse_name(source)
        if name != source.parent.name:
            failures.append(f"source folder mismatch: {source}")
        for runtime in ("Codex", "Claude"):
            for expected, target in skill_files(source, runtime):
                actual = target.read_bytes() if target.exists() else b""
                status = "PASS" if expected == actual else "FAIL"
                print(f"{status} {runtime} skill {name}: {target}")
                if status == "FAIL":
                    failures.append(f"{runtime} skill {name}: {target.name}")
    print(f"SOURCE_SHA256 {digest(SHARED.read_bytes())}")
    if failures:
        print("VERIFY_FAILED " + ", ".join(failures), file=sys.stderr)
        return 1
    print("VERIFY_OK all managed global files match their canonical sources")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    install_parser = subparsers.add_parser("install", help="preview or apply managed global files")
    install_parser.add_argument("--apply", action="store_true", help="apply updates after preview")
    subparsers.add_parser("verify", help="compare installed files with canonical sources")
    args = parser.parse_args()
    return install(args.apply) if args.command == "install" else verify()


if __name__ == "__main__":
    raise SystemExit(main())
