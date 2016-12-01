var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('login litecart', function() {
    let driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);
    });

    test.it('Registration', function() {
        let email = Date.now() + "@test.ru";
        console.log(email)
        driver.get('http://localhost/litecart/en/');
        driver.findElement(By.css('form[name=login_form] a')).click();
        driver.findElement(By.css('[name=firstname]')).sendKeys('Valentina');
        driver.findElement(By.css('[name=lastname]')).sendKeys('Timofeeva');
        driver.findElement(By.css('[name=address1]')).sendKeys('Address1');
        driver.findElement(By.css('[name=postcode]')).sendKeys('123456');
        driver.findElement(By.css('[name=city]')).sendKeys('Korolev');
        driver.findElement(By.css('[name=email]')).sendKeys(email);
        driver.findElement(By.css('[name=phone]')).sendKeys('+79031231212');
        driver.findElement(By.css('[name=password]')).sendKeys('Selenium');
        driver.findElement(By.css('[name=confirmed_password]')).sendKeys('Selenium');
        driver.findElement(By.css('[name=create_account]')).click();
        driver.findElement(By.css('#box-account li:nth-child(4) a')).click();
        driver.findElement(By.css('[name=email]')).sendKeys(email);
        driver.findElement(By.css('[name=password]')).sendKeys('Selenium');
        driver.findElement(By.css('[name=login]')).click();
        driver.findElement(By.css('#box-account li:nth-child(4) a')).click();
    });

    test.after(function() {
        driver.quit();
    });
});