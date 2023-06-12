import 'cypress-xpath';
import { enterTitle, expectedNotification, openMail, passwordAlert, registerTitle } from '../fixtures/credentialsData';

class RegistrationPage {
    // Локаторы
    private clickLogInButtonLocator = "//*[@class='auth-bar__item auth-bar__item--text']"; //Нажать на кнопку "Вход"
    private logInFormOpenLocator = "//div[contains(@class, 'auth-form__title')]"; //Открылась форма логина
    private linkToRegisterFormLocator = "(//a[contains(@class, 'auth-form__link')])[1]"; //Перейти по ссылке "Зарегистрироваться на Onliner"
    private registerFormPageTitleLocator = "//div[contains(@class, 'auth-form__title')]"; //Открылась форма регистрации
    private enterValidUserEmailLocator = "//*[@placeholder='Ваш e-mail']"; //Ввести валидный email
    private acceptTermsOfUseLocator = "//span[@class='auth-checkbox__faux']"; //Принять условия соглашения
    private clickOnRegisterButtonLocator = "//button[@type='submit']"; //Нажать на кнопку "Зарегистрироваться"
    private fieldsRedColorLocator = "(//input[contains(@class, 'auth-input_error')])[1]"; //Поля пароля подсвечены
    private setUserPasswordAlertLocator = "(//div[contains(@class, 'auth-form__description_error')])[1]"; //Отображается алерт "Укажите пароль"
    private enterPasswordMainFieldLocator = "(//div[contains(@class, 'auth-input__wrapper')])[2]"; //Ввести пароль в оба поля пароля (12 символов)
    private enterPasswordRepeatFieldLocator = "(//div[contains(@class, 'auth-input__wrapper')])[3]"; //Ввести пароль в оба поля пароля (12 символов) - подтвердить
    private notificationNearPasswordVisibleLocator = "(//div[contains(@class, 'auth-form__description')])[1]"; //"Очень надежный пароль, 12 символов" отображается около поля пароля
    private secondClickOnRegisterButtonLocator = "//button[@type='submit']"; //Нажать на кнопку "Зарегистрироваться"
    private buttonOpenMailBoxLocator = "//a[contains(@class, 'auth-button')]"; //Окно с просьбой подтверждения имейла открыто, отображается кнопка "перейти в почту"

    // Веб-элементы (приватные)
    private get clickLogInButton() {
        return cy.xpath(this.clickLogInButtonLocator);
    }
    private get logInFormOpen() {
        return cy.xpath(this.logInFormOpenLocator);
    }
    private get linkToRegisterForm() {
        return cy.xpath(this.linkToRegisterFormLocator);
    }
    private get registerFormPageTitle() {
        return cy.xpath(this.registerFormPageTitleLocator);
    }
    private get enterValidUserEmail() {
        return cy.xpath(this.enterValidUserEmailLocator);
    }
    private get acceptTermsOfUse() {
        return cy.xpath(this.acceptTermsOfUseLocator);
    }
    private get clickOnRegisterButton() {
        return cy.xpath(this.clickOnRegisterButtonLocator);
    }
    private get fieldsRedColor() {
        return cy.xpath(this.fieldsRedColorLocator);
    }
    private get setUserPasswordAlert() {
        return cy.xpath(this.setUserPasswordAlertLocator);
    }
    private get enterPasswordMainField() {
        return cy.xpath(this.enterPasswordMainFieldLocator);
    }
    private get enterPasswordRepeatField() {
        return cy.xpath(this.enterPasswordRepeatFieldLocator);
    }
    private get notificationNearPasswordVisible() {
        return cy.xpath(this.notificationNearPasswordVisibleLocator);
    }
    private get secondClickOnRegisterButton() {
        return cy.xpath(this.secondClickOnRegisterButtonLocator);
    }
    private get buttonOpenMailBox() {
        return cy.xpath(this.buttonOpenMailBoxLocator);
    }

    // Методы взаимодействия с ними
    logInButton() {
        this.clickLogInButton.click();
    }
    verifyLogInFormOpen() {
        const trimmedText = Cypress.$.trim(enterTitle);
        this.logInFormOpen.should('contain.text', trimmedText);
    }
    linkToRegistrationForm() {
        this.linkToRegisterForm.click();
    }
    registerFormTitle() {
        const trimmedText = Cypress.$.trim(registerTitle);
        this.registerFormPageTitle.should('contain.text', trimmedText);
    }
    setUserEmail(emailRegister: string) {
        this.enterValidUserEmail.type(emailRegister);
    }
    acceptTermsUse() {
        this.acceptTermsOfUse.click();
    }
    clickOnSubmitButton() {
        this.clickOnRegisterButton.click();
    }
    verifyFieldsHaveRedColor() {
        this.fieldsRedColor.should('be.visible');
    }
    enterUserPasswordAlert() {
        this.setUserPasswordAlert.should('contain.text', passwordAlert);
    }
    setPasswordMainField(passwordRegister: string) {
        this.enterPasswordMainField.type(passwordRegister);
    }
    setPasswordRepeatField(passwordRegister: string) {
        this.enterPasswordRepeatField.type(passwordRegister);
    }
    verifyNotificationNearPassword() {
        this.notificationNearPasswordVisible.should('contain.text',expectedNotification);
    }
    secondClickOnSubmitButton() {
        this.secondClickOnRegisterButton.click();
    }
    buttonOpenMail() {
        this.buttonOpenMailBox.should('contain.text', openMail);
    }
}
export const registrationPage = new RegistrationPage();