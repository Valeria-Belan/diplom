import {
    emailLogin,
    emailRegister,
    passwordLogin,
    passwordRegister,
} from '../../fixtures/credentialsData';
import { catalogPage } from '../../pages/catalogPage';
import { comparisonPage } from '../../pages/comparisonPage';
import { currencyPage } from '../../pages/currencyPage';
import { filterPage } from '../../pages/filterPage';
import { loginPage } from '../../pages/loginPage';
import { registrationPage } from '../../pages/registrationPage';
import { searchPage } from '../../pages/searchPage';
import { supportPage } from '../../pages/supportPage';

describe('Onliner diplom tests with login', () => {
    beforeEach(() => {
        cy.visit('https://www.onliner.by/');
    });
    it('1 - Login page //Вход с валидными кредами ', () => {
        loginPage.getRegistartionPageOpens();
        loginPage.registartionForm();
        loginPage.setUserEmail(emailLogin);
        loginPage.setPassword(passwordLogin);
        loginPage.clickOnSubmitButton();
        loginPage.captchaFieldExists();
    });
    it('2 - Registration page //Регистрация пользователя ', () => {
        registrationPage.logInButton();
        registrationPage.verifyLogInFormOpen();
        registrationPage.linkToRegistrationForm();
        registrationPage.registerFormTitle();
        registrationPage.setUserEmail(emailRegister);
        registrationPage.acceptTermsUse();
        registrationPage.clickOnSubmitButton();
        registrationPage.verifyFieldsHaveRedColor();
        registrationPage.enterUserPasswordAlert();
        registrationPage.setPasswordMainField(passwordRegister);
        registrationPage.setPasswordRepeatField(passwordRegister);
        registrationPage.verifyNotificationNearPassword();
        registrationPage.secondClickOnSubmitButton();
        registrationPage.buttonOpenMail();
    });
    it('4 - Search page //Пользователь может выполнить поиск ', () => {
        searchPage.searchMemoryCard();
        searchPage.verifyMemoryCard();
        searchPage.clearSearchField();
        searchPage.searchNewProduct();
        searchPage.verifyNewProductSelected();
        searchPage.verifyProductTitle();
    });
    it('5 - Filter page //Фильтрация страницы каталога ', () => {
        filterPage.catalogLocatorOpens();
        filterPage.computersAndWeb();
        filterPage.laptopsAndOthers();
        filterPage.laptopsPage();
        filterPage.verifyLaptopsPageTitle();
        filterPage.getTotalProductsCount();
        filterPage.selectFilterAsus();
        filterPage.verifyFilterAsusAppeared();
        filterPage.getResultAsusFilter();
        filterPage.firstSelectorMatrix();
        filterPage.setFisrtMatrixValue();
        filterPage.secondSelectorMatrix();
        filterPage.setSecondMatrixValue();
        filterPage.filterMatrixAppeared();
        filterPage.verifyFilterAsusAppeared();
        filterPage.getReasultMatrixFilterUsage();
        filterPage.superPriceFilter();
        filterPage.verifySuperPriceFilter();
        filterPage.signSuperPriceForAllProducts();
        filterPage.deleteFilterAsus();
    });
    it('7 - Currency page //Конвертер валют ', () => {
        currencyPage.currencyPage();
        currencyPage.verifyCurrencyTitleShown();
        currencyPage.currentDate();
        currencyPage.threeCurrency();
        currencyPage.buyButton();
        currencyPage.textConverterField();
        currencyPage.defaultValue();
        currencyPage.typeRandomNumber();
        currencyPage.defaultCurrencyInDropdown();
        currencyPage.newCurrencyIn();
        currencyPage.currencyResultByn();
        currencyPage.resultNumberCurrency();
    });
    it('8 - Catalog page //Работа с каталогом недвижимости ', () => {
        catalogPage.housesAndFlatsPage();
        catalogPage.chooseRent();
        catalogPage.minskRentPage();
        catalogPage.rentTitle();
        catalogPage.catalogMap();
        catalogPage.getAdsCount();
        catalogPage.verifyRoomIsVisibleBeforeFilter();
        catalogPage.flatsInFilter();
        catalogPage.verifyNoRoomVisibleAfterFilter();
        catalogPage.getAdsCountFlatFilter();
        catalogPage.selectTwoRoomFlats();
        catalogPage.filetredTwoNumberResults();
        catalogPage.onlyTwoRoomFlatsDisplaed();
        catalogPage.enterPrice();
        catalogPage.onEmptySpace();
        catalogPage.filetredPriceResults();
        catalogPage.validPriceSelected();
        catalogPage.clickOnMetro();
        catalogPage.nearMetroValue();
        catalogPage.filetredMetroResults();
        catalogPage.getValueFlatBeforeSorting();
        catalogPage.pageSorting();
        catalogPage.expensiveFlat();
        catalogPage.checkFlatAfterSorting();
    });
    it('9 - Support page //Форма поддержки пользователей ', () => {
        supportPage.supportClientsPage();
        supportPage.supportRequestPage();
        supportPage.enterUserNameField();
        supportPage.verifyNameFieldEntered();
        supportPage.deleteName();
        supportPage.clickOnEmptyField();
        supportPage.anonymousVisibleName();
        supportPage.setValueIntoEmail();
        supportPage.clickOnEmptyField();
        supportPage.emailFieldRed();
        supportPage.setCorrectValuIntoEmail();
        supportPage.clickAgainOnEmptyField();
        supportPage.emailNotHaveFieldRed();
        supportPage.problemType();
        supportPage.countForProblemTypeDropdown();
        supportPage.whereField();
        supportPage.countWhereFieldDropdown();
        supportPage.shortDescriptionField();
        supportPage.fullDescriptionField();
        supportPage.inputFieldCaptcha();
        supportPage.captchaNumber();
        supportPage.addButton();
    });
    it('10 - Comparison of two products //Сравнение 2-х товаров ', () => {
        comparisonPage.catalogLocatorOpens();
        comparisonPage.electronicsTabOpens();
        comparisonPage.tvVideoTab();
        comparisonPage.TvTabOpens();
        comparisonPage.firstTvPageOpens();
        comparisonPage.firstTvToCompare();
        comparisonPage.checkBoxSelected();
        comparisonPage.fisrtTvIsAdded();
        comparisonPage.tvCatalogReturnOpens();
        comparisonPage.secondTvPageOpens();
        comparisonPage.verifySecondTvAddedToCompare();
        comparisonPage.checkBoxSelected();
        comparisonPage.secondTvIsAdded();
        comparisonPage.popupComparison();
        comparisonPage.comparisonProductsPageOpens();
        comparisonPage.fisrtTvTitleExists();
        comparisonPage.secondTvTitleExists();
        comparisonPage.checkBoxDifference();
    });
});