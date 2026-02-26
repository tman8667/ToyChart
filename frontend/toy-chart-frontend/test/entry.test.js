require("selenium-webdriver");
require("jest");

const { Builder, By, until } = require("selenium-webdriver");
jest.setTimeout(30000);

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:5173/");
});

afterEach(async () => {
    await driver.quit();
});

/*test('add chart entry', async () => {
    // Add formula
    const date = Date.now().toString();
    await driver.findElement(By.id("chartNameFormulaInput")).sendKeys(date);
    await driver.findElement(By.id("freeMultInput")).sendKeys("0.3");
    await driver.findElement(By.id("paidMultInput")).sendKeys("0.25");
    await driver.findElement(By.id("programmedMultInput")).sendKeys("0.05");
    await driver.findElement(By.id("salesMultInput")).sendKeys("0.1");
    await driver.findElement(By.id("radioMultInput")).sendKeys("0.3");
    await driver.findElement(By.id("submitFormula")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Chart formula added successfully.");

    // Retrieve formulas and verify
    await driver.findElement(By.id("retrieveFormula")).click();
    let tableBody = await driver.findElement(By.id("formulasTableBody")).getText();
    expect(tableBody).toMatch(new RegExp(date));
});*/

test('non number values', async () => {
    // Input non-number values for multipliers
    await driver.findElement(By.id("chartNameEntryInput")).sendKeys("Test");
    await driver.findElement(By.id("chartDateInput")).sendKeys("01-01-2000");
    await driver.findElement(By.id("songInput")).sendKeys("Test");
    await driver.findElement(By.id("artistInput")).sendKeys("Test");
    await driver.findElement(By.id("freeStreamsInput")).sendKeys("Test");
    await driver.findElement(By.id("paidStreamsInput")).sendKeys("Test");
    await driver.findElement(By.id("programmedStreamsInput")).sendKeys("Test");
    await driver.findElement(By.id("salesInput")).sendKeys("Test");
    await driver.findElement(By.id("radioInput")).sendKeys("Test");
    await driver.findElement(By.id("imgURLInput")).sendKeys("Test");
    await driver.findElement(By.id("submitAddEntry")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Streams/sales/radio values must be numbers");
});

test('negative values', async () => {
    // Input negative numbers for streams/sales/radio
    await driver.findElement(By.id("chartNameEntryInput")).sendKeys("Test");
    await driver.findElement(By.id("chartDateInput")).sendKeys("01-01-2000");
    await driver.findElement(By.id("songInput")).sendKeys("Test");
    await driver.findElement(By.id("artistInput")).sendKeys("Test");
    await driver.findElement(By.id("freeStreamsInput")).sendKeys(-1);
    await driver.findElement(By.id("paidStreamsInput")).sendKeys(-1);
    await driver.findElement(By.id("programmedStreamsInput")).sendKeys(-1);
    await driver.findElement(By.id("salesInput")).sendKeys(-1);
    await driver.findElement(By.id("radioInput")).sendKeys(-1);
    await driver.findElement(By.id("imgURLInput")).sendKeys("Test");
    await driver.findElement(By.id("submitAddEntry")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Streams/sales/radio cannot be negative");
});

/*
 GIVEN: There is no chart formula added with name "Error"
 WHEN: The user enters the name "Error" with other required values filled and clicks submit
 THEN: An alert reading "A chart with that name does not exist" comes up
 */
test('name does not exist', async () => {
    // Add formula
    await driver.findElement(By.id("chartNameEntryInput")).sendKeys("Error");
    await driver.findElement(By.id("chartDateInput")).sendKeys("01-01-2000");
    await driver.findElement(By.id("songInput")).sendKeys("Test");
    await driver.findElement(By.id("artistInput")).sendKeys("Test");
    await driver.findElement(By.id("freeStreamsInput")).sendKeys(0);
    await driver.findElement(By.id("paidStreamsInput")).sendKeys(0);
    await driver.findElement(By.id("programmedStreamsInput")).sendKeys(0);
    await driver.findElement(By.id("salesInput")).sendKeys(0);
    await driver.findElement(By.id("radioInput")).sendKeys(0);
    await driver.findElement(By.id("imgURLInput")).sendKeys("Test");
    await driver.findElement(By.id("submitAddEntry")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("A chart with that name does not exist");
});