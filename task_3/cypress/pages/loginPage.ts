import 'cypress-xpath';

class LoginPage {
    // Локаторы
    private registartionPageOpensLocator = "//*[@class='auth-bar__item auth-bar__item--text']"; //Нажать на кнопку "Вход"
    private registartionFormOpensLocator = "//div[@class='auth-form__body']"; //Открылась форма логина
    private registartionPageEmailLocator = "//input[@placeholder='Ник или e-mail']"; //Ввести email
    private registartionPagePasswordLocator = "//input[@placeholder='Пароль']"; //Ввести пароль
    private submitButtonLocator = "//button[contains(@class, 'auth-button')]"; //Нажать кнопку "Войти"
    private captchaFieldLocator = "//div[@class='auth-form__captcha']"; //Появилось окошко для ввода капчи

    // Веб-элементы (приватные)
    private get registartionPageOpens() {
        return cy.xpath(this.registartionPageOpensLocator);
    }
    private get registartionFormOpens() {
        return cy.xpath(this.registartionFormOpensLocator);
    }
    private get registartionPageEmail() {
        return cy.xpath(this.registartionPageEmailLocator);
    }
    private get registartionPagePassword() {
        return cy.xpath(this.registartionPagePasswordLocator);
    }
    private get submitButton() {
        return cy.xpath(this.submitButtonLocator);
    }
    private get captchaField() {
        return cy.xpath(this.captchaFieldLocator);
    }

    // Методы взаимодействия с ними
    getRegistartionPageOpens() {
        this.registartionPageOpens.click();
    }
    registartionForm() {
        this.registartionFormOpens.should("be.visible");
    }
    setUserEmail(email: string) {
        this.registartionPageEmail.type(email);
    }
    setPassword(password: string) {
        this.registartionPagePassword.type(password);
    }
    clickOnSubmitButton() {
        this.submitButton.click();
    }
    captchaFieldExists() {
        this.captchaField.should("be.visible");
    }
}

export const loginPage = new LoginPage();