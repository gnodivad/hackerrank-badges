const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const BADGE_LIST_SELECTOR = "div.badges-list";

    await page.goto("https://www.hackerrank.com/DavidODW");

    let badgesListLength = await page.evaluate(sel => {
        let element = document.querySelector(sel);

        return element.childElementCount;
    }, BADGE_LIST_SELECTOR);

    browser.close();
}

run();
