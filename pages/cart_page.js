var webdriver = require('selenium-webdriver');
var By = webdriver.By,
    until = webdriver.until;

class CartPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get('http://localhost/litecart/en/checkout');
    }

    removeAll() {
        let driver = this.driver;
        driver.findElements(By.css('td.sku')).then(list=>{
            for(let i=0;i<list.length;i++){
                let x = driver.findElement(By.css('.dataTable'));
                driver.findElement(By.css('[name="remove_cart_item"]')).click();
                driver.wait(until.stalenessOf(x),  1000/*ms*/);
            }
        });
    }

}

module.exports = CartPage;
