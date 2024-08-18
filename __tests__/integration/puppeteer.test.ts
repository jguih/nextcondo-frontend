import puppeteer, { Browser, Page } from "puppeteer";

describe("Puppeteer", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("redirects to login page", async () => {
    // Arrange
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");

    // Act
    // wait login page redirect
    await page.locator('input[name="email"]').wait();

    //Assert
    const title = await page.title();
    expect(title).toBe("NextCondo | Login");
  });

  it("logins", async () => {
    // Arrange
    const page = await browser.newPage();
    await page.goto("http://localhost:3000");

    // Act
    await page.locator('input[name="email"]').fill("test@test.com");
    await page.locator('input[name="password"]').fill("12345678");
    await page.locator('button[type="submit"]').click();
    await page.waitForNavigation();

    // Assert
    const title = await page.title();
    expect(title).toBe("NextCondo");
  });

  afterAll(async () => {
    await browser.close();
  });
});