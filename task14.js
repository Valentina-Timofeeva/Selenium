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
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
    });

    test.it('Open windows', function() {
        let waitWindow = function () {
            return new Promise((resolve, reject)=>{
               let x = setInterval(()=>{
                    driver.getAllWindowHandles().then(list=>{
                        if (list.length > 1){
                            resolve();
                            clearInterval(x);
                        }
                    })
                }, 200);
            });
        };
        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        driver.findElement(By.css('form[name=countries_form] tr td a')).click();
        driver.getWindowHandle().then(mainwin=>{
            return Promise.all([mainwin, driver.findElements(By.css('.fa-external-link'))])
        }).then(data=>{
            let mainwin = data[0];
            let linkList = data[1];
            for(let i=0;i<linkList.length;i++){
                linkList[i].click();
                driver.wait(waitWindow());
                driver.getAllWindowHandles().then(winlist=>{
                    winlist.splice(winlist.indexOf(mainwin), 1);
                    let tabwin = winlist.pop();
                    driver.switchTo().window(tabwin);
                    driver.close();
                    driver.switchTo().window(mainwin);
                })
            }
        });
    });

    test.after(function() {
        driver.quit();
    });
});