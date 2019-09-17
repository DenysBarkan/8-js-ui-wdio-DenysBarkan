import { should } from 'chai';
should();
import { HomePage } from '../../pageObjects/HomePage.page';
import { Header } from '../../pageObjects/components/header';
import { Region } from '../../pageObjects/components/regionList';
import { HeaderMenu } from '../../pageObjects/components/siteMenu'; 


describe('HEADER', function () {
    const homePage = new HomePage();
    const header = new Header();
    const regionPref = new Region();

    beforeEach(function(){
        browser.setWindowSize(1600,900);
    });
    afterEach(function(){
        browser.refresh();
    })

    it('Title&FavIcon', function () {
        homePage.open();  
        const title = homePage.getTitle();
        title.should.be.equal("Ducks Store | Online Store", "The Title is wrong");
        header.favIcon.isExisting().should.be.equal(true, 'Favicon is not shown');
    });

    it('Header', function() {
        homePage.open();
        header.favIcon.isExisting().should.be.equal(true, "The FavIcon is not shown");
        homePage.getLogoHref().should.to.include('ip-5236.sunline.net', 'The logo link is not exist');
        homePage.getLogoTitle().should.be.equal('Ducks Store', 'The logo title is wrong');
        homePage.changePref();
        regionPref.regionSetOverlay.waitForDisplayed();
        regionPref.regionSetOverlay.isDisplayed().should.be.true;
        let country = 'Ukraine';
        homePage.selectCountry(country);
        let curren = 'Euros';
        homePage.selectCurrency(curren);
        regionPref.clickSaveBtn()
        header.getSelectedLanguage().should.be.equal('English', 'The language is incorrect');
        header.getSelectedCurrency().should.be.equal('EUR', 'The currency is incorrect');
        header.getSelectedCountry().should.be.equal(country, 'The country selected incorrect');
        homePage.changePref();
        country = 'United States';
        homePage.selectCountry(country);
        curren = 'US Dollars';
        homePage.selectCurrency(curren);
        regionPref.clickSaveBtn();
        header.getSelectedCurrency().should.be.equal('USD', 'The currency is incorrect');
        header.getSelectedCountry().should.be.equal(country, 'The country selected incorrect');
        header.getCartTitle().should.be.equal("Shopping Cart", "The Title is not correct");
        header.getCartImg().should.be.true;
    });

    it.only("Site menu", function(){
        const topMenu = new HeaderMenu();
        homePage.open();
        homePage.topMenu.getSearchPlaceholder().should.be.equal("Search products …", 'Placeholder in the search field is not shown');
        homePage.fillSearchField('Some Value');
        //console.log("1 search result : ", topMenu.getSearchResult());
        homePage.topMenu.getSearchResult().should.to.include('No matching results', 'Search function is not working');
        browser.back();
        homePage.fillSearchField("Duck");
        //console.log("2 search result : ", topMenu.getSearchResult());
        homePage.topMenu.getSearchResult().should.to.include('Duck', 'Search function is not working');
        homePage.topMenu.getHomeBtnTitle().should.be.equal('Home', 'Home button doesnt have title');
        homePage.topMenu.getHomeBtnHref().should.to.include('ip-5236.sunline.net.ua:38015', 'Home btn href is wrong');
        homePage.topMenu.homeBtn.click();
        browser.getUrl().should.be.equal('http://ip-5236.sunline.net.ua:38015/', 'The home page is not opened');
        homePage.topMenu.getCategoriesDropDownTitle().should.be.equal("Categories", "The Title of dropdown list is incorrect");
        homePage.topMenu.openCategoriesDropDown().should.be.true;
        homePage.topMenu.getCategoriesDropDownList().should.not.be.empty;
        homePage.topMenu.getManufacturesDropDownTitle().should.be.equal("Manufacturers", "The Title of dropdown list is incorrect");
        homePage.topMenu.openManufacturesDropDown().should.be.true;
        homePage.topMenu.getManufactureDropDownList().should.not.be.empty;       
        homePage.topMenu.getCustomServiceTitle().should.be.equal('Customer Service', 'The Title of Custom Service is not correct');
        homePage.topMenu.getCustimServiceHref().should.to.include('38015/customer-service');
        homePage.topMenu.customService.click();
        browser.getUrl().should.be.equal(homePage.topMenu.getCustimServiceHref()); 
        homePage.topMenu.getSignInTitle().should.be.equal("Sign In", "The Sign IOn doesnt have name");
        homePage.openSignInDropDown().should.be.equal('true');
    });

});