var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class ProductPage {

    constructor(driver) {
        this.driver = driver;
    }

    addProduct(numberOfItem){
        let count = this.driver.findElement(By.css('.quantity'));
        this.driver.findElement(By.css('[name=add_cart_product]')).click();

        if (numberOfItem) {
            this.driver.wait(until.elementTextMatches(count, new RegExp(`^${numberOfItem}$`)), 1000/*ms*/);
        }
    }
}

module.exports = ProductPage;