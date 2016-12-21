var webdriver = require('selenium-webdriver'),
    index_page = require('../pages/index_page'),
    cart_page = require('../pages/cart_page'),
    product_page = require('../pages/product_page');

class Application {

    constructor() {
        this.driver = new webdriver.Builder()
            .forBrowser("chrome")
            .build();
        this.driver.manage().timeouts().implicitlyWait(10000/*ms*/);
        this.IndexPage = new index_page(this.driver);
        this.CartPage = new cart_page(this.driver);
        this.ProductPage = new product_page(this.driver);

    }

    quit() {
        this.driver.quit();
    }

    addFirstNewDuckToCart(numberOfDuck) {
        this.IndexPage.open();
        this.IndexPage.getFirstNewDuck().click();
        this.ProductPage.addProduct(numberOfDuck);
    }

    removeAllDucks() {
        this.CartPage.open();
        this.CartPage.removeAll();
    }
}

exports.Application = Application;