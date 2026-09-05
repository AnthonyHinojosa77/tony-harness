// Drives sign-up, sign-out, and sign-in through the real pages.
// Usage: node e2e/auth-flow.mjs <baseUrl> <screenshotDir>
import { chromium } from "playwright";

const [base = "http://localhost:3123", dir = "."] = process.argv.slice(2);
const email = `anthony+${Date.now()}@example.com`;
const password = "a-long-enough-password";

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

function check(condition, message) {
  if (!condition) throw new Error(message);
}

await page.goto(base + "/", { waitUntil: "networkidle" });
check(page.url().endsWith("/sign-in"), `expected redirect to /sign-in, got ${page.url()}`);
await page.screenshot({ path: `${dir}/auth-sign-in.png` });

await page.goto(base + "/chats", { waitUntil: "networkidle" });
check(page.url().endsWith("/sign-in"), "protected page did not redirect when signed out");

await page.goto(base + "/sign-up", { waitUntil: "networkidle" });
await page.screenshot({ path: `${dir}/auth-sign-up.png` });
await page.getByLabel("Name").fill("Anthony");
await page.getByLabel("Email").fill(email);
await page.getByLabel("Password").fill(password);
await page.getByRole("button", { name: "Create account" }).click();
await page.waitForURL("**/chats");
await page.getByText("Hello, Anthony.").waitFor();
await page.screenshot({ path: `${dir}/auth-chats.png` });

await page.getByRole("button", { name: "Sign out" }).click();
await page.waitForURL("**/sign-in");

await page.getByLabel("Email").fill(email);
await page.getByLabel("Password").fill("wrong-password-here");
await page.getByRole("button", { name: "Sign in" }).click();
await page.getByRole("alert").waitFor();

await page.getByLabel("Password").fill(password);
await page.getByRole("button", { name: "Sign in" }).click();
await page.waitForURL("**/chats");
await page.getByText("Hello, Anthony.").waitFor();

await browser.close();
console.log("auth flow ok:", email);
