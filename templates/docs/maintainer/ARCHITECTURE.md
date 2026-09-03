# Maintainer Architecture

> Internal engineering context. Keep end-user guidance in `docs/user/`.

## System boundary

[Describe the system's responsibility and what it delegates to external systems.]

## Components

| Component | Responsibility | Inputs | Outputs | Owner |
| --- | --- | --- | --- | --- |
| [name] | [one responsibility] | [contracts] | [contracts] | [owner] |

## Data and control flow

[Explain the normal path and the important failure path.]

## Invariants

1. [A testable rule the system must preserve.]

## External dependencies

| Dependency | Contract | Failure behavior | Last verified |
| --- | --- | --- | --- |
| [provider] | [official contract] | [explicit behavior] | [date/check] |

## Change procedure

1. Update the owning contract.
2. Update every applicable producer, consumer, and entry point.
3. Run the project-native automated gates.
4. Verify the end-user behavior and update this document when the boundary changes.

