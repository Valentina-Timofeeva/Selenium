var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('login litecart', function() {
    var driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });

    test.it('Login', function() {
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();

    });

    test.after(function() {
        driver.quit();
    });
});