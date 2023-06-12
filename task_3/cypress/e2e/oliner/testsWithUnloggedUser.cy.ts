import { emailLogin, emailRegister, passwordLogin, passwordRegister, } from '../../fixtures/credentialsData';
import { currencyPage } from '../../pages/currencyPage';
import { loginPage } from '../../pages/loginPage';
import { registrationPage } from '../../pages/registrationPage';
import { searchPage } from '../../pages/searchPage';

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
    it('3 - Search page //Пользователь может выполнить поиск ', () => {
        searchPage.searchMemoryCard();
        searchPage.verifyMemoryCard();
        searchPage.clearSearchField();
        searchPage.searchNewProduct();
        searchPage.verifyNewProductSelected();
        searchPage.verifyProductTitle();
    });
    it('4 - Currency page //Конвертер валют ', () => {
        currencyPage.currencyPage();
        currencyPage.verifyCurrencyTitleShown();
        currencyPage.currentDate();
        currencyPage.threeCurrenciesShown();
        currencyPage.buyButton();
        currencyPage.textConverterField();
        currencyPage.defaultValue();
        currencyPage.typeRandomNumber();
        currencyPage.defaultCurrencyInDropdown();
        currencyPage.newCurrencyIn();
        currencyPage.currencyResultByn();
        currencyPage.resultNumberCurrency();
    });
});