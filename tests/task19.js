var test = require('selenium-webdriver/testing'),
    target = require('../app/Application');

test.describe('login litecart', function() {
    var app;

    test.before(function () {
        app = new target.Application();
    });

    test.it('Add Product', function () {

        app.addFirstNewDuckToCart(1);
        app.addFirstNewDuckToCart(2);
        app.addFirstNewDuckToCart(3);
        app.removeAllDucks();

    });

    test.after(function() {
        app.quit();
    });
});