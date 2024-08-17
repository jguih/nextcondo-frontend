import puppeteer, { Browser, Page } from "puppeteer";

describe("Puppeteer", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("renders", async () => {
    const page = await browser.newPage();
    await page.goto("https://pptr.dev");
    const title = await page.title();
    expect(title).toBe("Puppeteer | Puppeteer");
  });

  afterAll(async () => {
    await browser.close();
  });
});
