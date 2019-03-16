const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const BADGE_LIST_SELECTOR = "div.badges-list";

    await page.goto("https://www.hackerrank.com/DavidODW");

    await page.waitForSelector("div > div.badges-list > div:nth-child(1) > div > div > svg");

    const svgImage = await page.$("div > div.badges-list > div:nth-child(1) > div > div > svg");

    await svgImage.screenshot({
        path: "screenshots/logo-screenshot.jpg",
        type: "jpeg",
        quality: 100
    });

    // let badgesListLength = await page.evaluate(sel => {
    //     let element = document.querySelector(sel);

    //     return element.childElementCount;
    // }, BADGE_LIST_SELECTOR);

    browser.close();
}

run();
