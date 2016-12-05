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
        driver.get('http://localhost/litecart/en/');
    });

    test.it('Add Product', function () {
        for(let i=1;i<4;i++){
            driver.findElement(By.css('#box-most-popular [class="sticker new"]')).click();
            let count = driver.findElement(By.css('.quantity'));
            driver.findElement(By.css('[name=add_cart_product]')).click();
            driver.wait(until.elementTextMatches(count, new RegExp(`^${i}$`)), 1000/*ms*/);
            driver.get('http://localhost/litecart/en/');
        }
        driver.findElement(By.css('#cart [class=link]')).click();
        driver.findElements(By.css('td.sku')).then(list=>{
            for(let i=0;i<list.length;i++){
                let x = driver.findElement(By.css('.dataTable'));
                driver.findElement(By.css('[name="remove_cart_item"]')).click();
                driver.wait(until.stalenessOf(x),  1000/*ms*/);
            }
        });
    });

    test.after(function() {
        driver.quit();
    });
});