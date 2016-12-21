var webdriver = require('selenium-webdriver');
var By = webdriver.By,
    until = webdriver.until;

class IndexPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get('http://localhost/litecart/en/');
    }

    getFirstNewDuck() {
        return this.driver.findElement(By.css('#box-most-popular [class="sticker new"]'));
    }
}

module.exports = IndexPage;
