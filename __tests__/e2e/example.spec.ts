import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("/");

  const email = page.getByLabel(/email/i);
  const password = page.getByLabel(/password/i);

  expect(email).toBeTruthy();
  expect(password).toBeTruthy();
});
