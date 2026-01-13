const { Builder, By, until} = require("selenium-webdriver");
const assert = require("assert");

async function testFormula() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("http://localhost:5173/");
    } finally {
        await driver.quit();
    }
}
testFormula();