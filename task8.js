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

    test.it('Login', function() {
        driver.get('http://localhost/litecart');
        driver.findElements(By.css('li.product')).then(list=>{
            for (let i=0; i < list.length; i++) {
                list[i].findElements(By.css('.sticker')).then(elements=>{
                    if (elements.length != 1){
                        throw new Error("Стикер должен быть только 1");
                    }
                });
            }
        });

    });

    test.after(function() {
        driver.quit();
    });
});