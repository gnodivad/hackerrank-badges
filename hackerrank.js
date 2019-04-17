const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const BADGE_LIST_SELECTOR = "div.badges-list";

    await page.goto("https://www.hackerrank.com/DavidODW");

    const svgImage = await page.$(
        "div > div.badges-list > div:nth-child(1) > div > div > svg"
    );

    const title = await page.evaluate(element => element.querySelector(".badge-title").innerHTML, svgImage);

    await svgImage.screenshot({
        path: `screenshots/badge-${getValidBadgeName(title)}.jpg`,
        type: "jpeg",
        quality: 100
    });

    // let badgesListLength = await page.evaluate(sel => {
    //     let element = document.querySelector(sel);

    //     return element.childElementCount;
    // }, BADGE_LIST_SELECTOR);

    browser.close();
}

function getValidBadgeName($title) {
    return $title.toLowerCase().replace(/ /g, "-");
}

run();
