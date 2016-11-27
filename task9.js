var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    myutils = require("./utils");

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

    test.it('Countries', function() {
        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        driver.findElements(By.css('form[name=countries_form] td:nth-child(5) a')).then(countrylist => {
            let listresult = [];
            for (let i=0; i < countrylist.length; i++){
                listresult.push(countrylist[i].getText());
            }
            return Promise.all(listresult);
        }).then(data => {
            let sortresult = data.slice().sort();
            if (!myutils.arrayIsEqual(data, sortresult)){
                throw new Error("Страны должны быть отсортированы в алфавитном порядке");
            }
        });
    });

    test.it('State', function () {
        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');

        var stCountryIndexes = [];
        driver.findElements(By.css('form[name=countries_form] td:nth-child(6)')).then(td => {
            var result = [];
            for(let i = 0; i < td.length; i++){
                result.push(td[i].getText());
            }
            return Promise.all(result);
        }).then((data) => {
            for (let i=0;i < data.length;i++) {
                let state = parseInt(data[i]);
                if (state > 0) {
                    stCountryIndexes.push(i);
                }
            }
            return driver.findElements(By.css('form[name=countries_form] td:nth-child(5) a'));
        }).then((a) => {
            var hrefs = [];
            for (let i=0;i < stCountryIndexes.length;i++) {
                hrefs.push(a[stCountryIndexes[i]].getAttribute('href'));
            }

            return Promise.all(hrefs);
        }).then(hrefs => {
            for (let i=0;i < hrefs.length;i++){
                driver.get(hrefs[i]);
                driver.findElements(By.css('#table-zones td:nth-child(3)')).then(statelist =>{
                    let listresult = [];
                    for (let i=0; i < statelist.length; i++){
                        listresult.push(statelist[i].getText());
                    }
                    return Promise.all(listresult);
                }).then(data => {
                    data.pop();
                    let sortresult = data.slice().sort();
                    if (!myutils.arrayIsEqual(data, sortresult)){
                        throw new Error("Зоны должны быть отсортированы в алфавитном порядке");
                    }
                });
            }
        });
    });

    test.it('Zones', function () {
        driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
        let zonelist = [];
        driver.findElements(By.css('form[name=geo_zones_form] td:nth-child(3) a')).then(a =>{
            let result = [];
            for(let i = 0; i < a.length; i++){
                result.push(a[i].getAttribute('href'));
            }
            return Promise.all(result);
        }).then(hrefs =>{
            for (let i=0;i < hrefs.length;i++){
                driver.get(hrefs[i]);
                driver.findElements(By.css('#table-zones td:nth-child(3) option[selected]')).then(option => {
                    let result = [];
                    for (let i = 0; i < option.length; i++) {
                        result.push(option[i].getText());
                    }
                    return Promise.all(result);
                }).then(data => {
                    let sortresult = data.slice().sort();
                    if (!myutils.arrayIsEqual(data, sortresult)) {
                        throw new Error("Зоны должны быть отсортированы в алфавитном порядке");
                    }
                });
            }
        });
    });

    test.after(function() {
        driver.quit();
    });
});
