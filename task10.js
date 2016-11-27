var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('selenium-webdriver/testing/assert'),
    myutils = require("./utils");

test.describe('login litecart', function() {
    let driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);
    });

    test.it('ComparePrice', function () {
        let productName, regText, campText;
        driver.get('http://localhost/litecart/en/');
        driver.findElement(By.css('#box-campaigns li.product a:first-child')).then(product =>{
            assert(product.findElement(By.css('.regular-price')).getCssValue('color')).equals('rgba(119, 119, 119, 1)', 'Не правильный цвет постоянной цены');
            assert(product.findElement(By.css('.regular-price')).getCssValue('font-size')).equals('14.4px', 'Не правильный размер основной цены');
            assert(product.findElement(By.css('.regular-price')).getCssValue('text-decoration')).equals('line-through', 'Основная цена должна быть зачеркнута');
            assert(product.findElement(By.css('.campaign-price')).getCssValue('color')).equals('rgba(204, 0, 0, 1)', 'Не правильный цвет скидочной цены');
            assert(product.findElement(By.css('.campaign-price')).getCssValue('font-size')).equals('18px', 'Не правильный размер скидочной цены');
            assert(product.findElement(By.css('.campaign-price')).getCssValue('text-decoration')).equals('none', 'Не правильно оформлен текст скидочной цены');

            return Promise.all([
                product.findElement(By.css('div.name')).getText(),
                product.findElement(By.css('.regular-price')).getText(),
                product.findElement(By.css('.campaign-price')).getText(),
            ]);
        }).then(data =>{
            [productName, regText, campText] = data;
            driver.findElement(By.css('#box-campaigns li.product a:first-child')).click();
            assert(driver.findElement(By.css('#box-product h1')).getText()).equals(productName, 'Не совпадает название продукта');
            assert(driver.findElement(By.css('#box-product .regular-price')).getText()).equals(regText, 'Не совпадает постоянная цена продукта');
            assert(driver.findElement(By.css('#box-product .campaign-price')).getText()).equals(campText, 'Не совпадает скидочная цена продукта');
            assert(driver.findElement(By.css('#box-product .regular-price')).getCssValue('color')).equals('rgba(102, 102, 102, 1)', 'Не правильный цвет постоянной цены');
            assert(driver.findElement(By.css('#box-product .regular-price')).getCssValue('font-size')).equals('16px', 'Не правильный размер основной цены');
            assert(driver.findElement(By.css('#box-product .regular-price')).getCssValue('text-decoration')).equals('line-through', 'Основная цена должна быть зачеркнута');
            assert(driver.findElement(By.css('#box-product .campaign-price')).getCssValue('color')).equals('rgba(204, 0, 0, 1)', 'Не правильный цвет скидочной цены');
            assert(driver.findElement(By.css('#box-product .campaign-price')).getCssValue('font-size')).equals('22px', 'Не правильный размер скидочной цены');
            assert(driver.findElement(By.css('#box-product .campaign-price')).getCssValue('text-decoration')).equals('none', 'Не правильно оформлен текст скидочной цены');

        });

    });

    test.after(function() {
        driver.quit();
    });
});
