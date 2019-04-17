const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const BADGE_LIST_SELECTOR = "div.badges-list";

    await page.goto("https://www.hackerrank.com/DavidODW");

    const badgesListLength = await page.evaluate(sel => {
        return element = document.querySelector(sel).childElementCount;
    }, BADGE_LIST_SELECTOR);

    for (let i = 1; i <= badgesListLength; i++) {
        console.log(`Downloading ${i} of ${badgesListLength} badges`);

        let svgImage = await page.$(
            `div > div.badges-list > div:nth-child(${i}) > div > div > svg`
        );

        let title = await page.evaluate(element => element.querySelector(".badge-title").textContent, svgImage);

        await svgImage.screenshot({
            path: `screenshots/badge-${getValidBadgeName(title)}.jpg`,
            type: "jpeg",
            quality: 100
        });
    }

    browser.close();
}

function getValidBadgeName($title) {
    return $title.toLowerCase().replace(/ /g, "-");
}

run();
