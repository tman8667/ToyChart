require("selenium-webdriver");
require("jest");

const { Builder, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:5173/");
});

afterEach(async () => {
   await driver.quit();
});

/*
* GIVEN: Frontend server is running
* WHEN: Page is loaded
* THEN: Title of page should be "ToyChart"
*/
test('page loads', async () =>{
    let title = await driver.getTitle();

    expect(title).toEqual("ToyChart");
});

test('add formula', async () => {
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
    let alert = await driver.switchTo().alert()
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Chart formula added successfully.");

    // Retrieve formulas and verify
    await driver.findElement(By.id("retrieveFormula")).click();
    let tableBody = await driver.findElement(By.id("formulasTableBody")).getText();
    expect(tableBody).toMatch(new RegExp(date));
});

test('empty fields', async () => {
    // Click submit with fields empty
    await driver.findElement(By.id("submitFormula")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert()
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Fields cannot be empty.");
});

test('non number multipliers', async () => {
    // Input non-number values for multipliers
    await driver.findElement(By.id("chartNameFormulaInput")).sendKeys("Test");
    await driver.findElement(By.id("freeMultInput")).sendKeys("Test");
    await driver.findElement(By.id("paidMultInput")).sendKeys("Test");
    await driver.findElement(By.id("programmedMultInput")).sendKeys("Test");
    await driver.findElement(By.id("salesMultInput")).sendKeys("Test");
    await driver.findElement(By.id("radioMultInput")).sendKeys("Test");
    await driver.findElement(By.id("submitFormula")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert()
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Multipliers must be numbers.");
});

test('multiplier sum not 1', async () => {
    // Input non-number values for multipliers
    await driver.findElement(By.id("chartNameFormulaInput")).sendKeys("Test");
    await driver.findElement(By.id("freeMultInput")).sendKeys("1");
    await driver.findElement(By.id("paidMultInput")).sendKeys("1");
    await driver.findElement(By.id("programmedMultInput")).sendKeys("1");
    await driver.findElement(By.id("salesMultInput")).sendKeys("1");
    await driver.findElement(By.id("radioMultInput")).sendKeys("1");
    await driver.findElement(By.id("submitFormula")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert()
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Multipliers must sum to 1.");
});

test('negative multipliers', async () => {
    // Input negative numbers for multipliers
    await driver.findElement(By.id("chartNameFormulaInput")).sendKeys("Test");
    await driver.findElement(By.id("freeMultInput")).sendKeys("-1");
    await driver.findElement(By.id("paidMultInput")).sendKeys("-1");
    await driver.findElement(By.id("programmedMultInput")).sendKeys("-1");
    await driver.findElement(By.id("salesMultInput")).sendKeys("-1");
    await driver.findElement(By.id("radioMultInput")).sendKeys("-1");
    await driver.findElement(By.id("submitFormula")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert()
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("Multipliers cannot be negative.");
});

test('name already exists', async () => {
    // Add formula
    await driver.findElement(By.id("chartNameFormulaInput")).sendKeys("Hot 100");
    await driver.findElement(By.id("freeMultInput")).sendKeys("0.3");
    await driver.findElement(By.id("paidMultInput")).sendKeys("0.25");
    await driver.findElement(By.id("programmedMultInput")).sendKeys("0.05");
    await driver.findElement(By.id("salesMultInput")).sendKeys("0.1");
    await driver.findElement(By.id("radioMultInput")).sendKeys("0.3");
    await driver.findElement(By.id("submitFormula")).click();

    // Accept alert and check text
    await driver.wait(until.alertIsPresent(), 5000);
    let alert = await driver.switchTo().alert()
    let alertText = await alert.getText();
    await alert.accept();
    expect(alertText).toEqual("That chartName already exists");
});
