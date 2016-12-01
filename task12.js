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
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
    });

    test.it('Registration', function() {
        driver.findElement(By.xpath("//*[contains(text(), 'Catalog')]")).click();
        driver.findElement(By.xpath("//*[contains(text(), ' Add New Product')]")).click();
        driver.findElement(By.xpath("//*[contains(text(), 'Enabled')]")).click();
        driver.findElement(By.css('[name="name[en]"]')).sendKeys('MyLittlePony');
        driver.findElement(By.css('[name=code]')).sendKeys('MLP001');
        driver.findElement(By.css('[name="product_groups[]"][value="1-3"]')).click();
        driver.findElement(By.css('[name=quantity]')).clear();
        driver.findElement(By.css('[name=quantity]')).sendKeys('30');
        driver.findElement(By.css('[name="new_images[]"]')).sendKeys(__dirname + '/pony.png');
        driver.findElement(By.css('[name=date_valid_from]')).sendKeys('01.12.2016');
        driver.findElement(By.css('[name=date_valid_to]')).sendKeys('01.12.2017');
        driver.findElement(By.css('[href="#tab-information"]')).click();
        driver.findElement(By.css('[name=manufacturer_id]')).click();
        driver.findElement(By.css('[name=manufacturer_id] [value="1"]')).click();
        driver.findElement(By.css('[name="short_description[en]"]')).sendKeys('My Little Pony is an entertainment ' +
            'franchise developed by Hasbro which is marketed primarily to girls.');
        driver.findElement(By.css('.trumbowyg-editor')).sendKeys('My Little Pony is an entertainment franchise developed ' +
            'by Hasbro which is marketed primarily to girls.');
        driver.findElement(By.css('[name="head_title[en]"]')).sendKeys('Little pony');
        driver.findElement(By.css('[name="meta_description[en]"]')).sendKeys('Little pony');
        driver.findElement(By.css('[href="#tab-prices"]')).click();
        driver.findElement(By.css('[name=purchase_price]')).clear();
        driver.findElement(By.css('[name=purchase_price]')).sendKeys('20');
        driver.findElement(By.css('[name=purchase_price_currency_code]')).click();
        driver.findElement(By.css('[name=purchase_price_currency_code] [value="USD"]')).click();
        driver.findElement(By.css('[name="prices[USD]"]')).sendKeys('20');
        driver.findElement(By.css('[name=save]')).click();
        driver.findElement(By.xpath("//*[contains(text(), 'MyLittlePony')]")).click();
    });

    test.after(function() {
        driver.quit();
    });
});