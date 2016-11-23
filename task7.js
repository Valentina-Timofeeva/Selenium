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
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
    });

    test.it('List', function () {
        driver.findElements(By.css('#box-apps-menu > li')).then( list => {
            for (let i=0; i < list.length; i++) {
                driver.findElement(By.css(`#box-apps-menu > li:nth-child(${i+1})`)).click();
                driver.findElements(By.css('h1'));
                driver.findElements(By.css('#box-apps-menu > li.selected li')).then(childlist => {
                    // console.log('3');
                    for (let x=0; x < childlist.length; x++) {
                        driver.findElement(By.css(`#box-apps-menu > li.selected li:nth-child(${x+1})`)).click();
                        driver.findElements(By.css('h1'));
                    }

                });
            }
        });
    });
    test.after(function() {
        driver.quit();
    });
});