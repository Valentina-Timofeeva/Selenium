var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
    // logging = require('selenium-webdriver/logging');



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
        var ducks = ['Blue Duck', 'Green Duck', 'Purple Duck', 'Red Duck', 'Yellow Duck'];
        driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
        driver.findElement(By.xpath("//*[contains(text(), 'Rubber Ducks')]")).click();
       for(let i=0;i<ducks.length;i++){
           driver.findElement(By.xpath(`//*[contains(text(), '${ducks[i]}')]`)).click();
           driver.executeScript(function () {
               // console.error('jopo');
           }).then(()=>{
               return driver.manage().logs().get("browser");
           }).then(function(logsEntries) {
               logsEntries.forEach(function (l) {
                   console.log(l);
                   console.log('122')
               });
           });
           driver.findElement(By.css('[name=cancel]')).click();
       }
    });

    test.after(function() {
        driver.quit();
    });
});