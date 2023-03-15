import 'cypress-xpath';
import { anonymousName, fullDescription, invalidEmail, shortDescription, supportRequestPageTitle, userName, validEmail } from '../fixtures/supportData';

class SupportPage {
    // Локаторы
    private supportClientsPageOpenLocaqtor = "(//a[contains(@class, 'footer-style__link')])[10]"; //Перейти по ссылке "Поддержка пользователей" в футере главной страницы
    private supportRequestPageOpenLocator = "//div//h1"; //Открыта страница "Запрос в службу поддержки"
    private setUserNameFieldLocator = "//input[@id='id_name']"; //Заполнить поле имени
    private nameFieldEnteredLocator = "//input[@class='i-p valid']"; //Поле имени заполнено
    private deleteNameTestLocator = "(//div[@class='i-view'])[1]"; //Очистить поле имени
    private clickOnAnyEmptyFieldLocator = "(//div[@class='lost-form-i'])[1]" //кликнуть на любое место, что убрать выделение с поля имени
    private anonymousVisibleNameFieldLocator = "//input[@id='id_name']"; //В поле отображается "Anonymous"
    private setValueIntoEmailFieldLocator = "//input[@id='id_email']" //Ввести рандомную строку в поле Email
    private problemTypeVisibleLocator = "//label[@for='id_type']"; //Отображается дропдаун "Тип проблемы"
    private countForProblemTypeLocator = "//select[@id='id_type']" // дропдаун "Тип проблемы" содержит более 1-го значения
    private whereFieldVisibleLocator = "//label[@for='id_project']"; //Отображается дропдаун "Где"
    private countWhereFieldTypeLocator = "//select[@id='id_project']" // дропдаун "Где"  содержит более 1-го значения
    private shortDescriptionFieldVisibleLocator = "//label[@for='id_subject']"; //Отображается поле "Краткое описание"
    private fullDescriptionFieldVisibleLocator = "//label[@for='id_description']"; //Отображается поле "Подробное описание"
    private inputFieldForCaptchaLocator = "//div//input[@id='id_captcha']"; //Отображается поле для ввода капчи
    private captchaNumberVisibleLocator = "//div//img[@class='captcha']"; //Отображается капча
    private addButtonExistsLocator = "//div//input[@type='image']"; //Отображается и enabled кнопка "Добавить" //но она всегда активна
   
    // Веб-элементы
    private get supportClientsPageOpen() {
        return cy.xpath(this.supportClientsPageOpenLocaqtor);
    }
    private get supportRequestPageOpen() {
        return cy.xpath(this.supportRequestPageOpenLocator);
    }
    private get setUserNameField() {
        return cy.xpath(this.setUserNameFieldLocator);
    }
    private get nameFieldEntered() {
        return cy.xpath(this.nameFieldEnteredLocator);
    }
    private get deleteNameTest() {
        return cy.xpath(this.deleteNameTestLocator);
    }
    private get clickOnAnyEmptyField() {
        return cy.xpath(this.clickOnAnyEmptyFieldLocator);
    }
    private get anonymousVisibleNameField() {
        return cy.xpath(this.anonymousVisibleNameFieldLocator);
    }
    private get setValueIntoEmailField() {
        return cy.xpath(this.setValueIntoEmailFieldLocator);
    }
    private get problemTypeVisible() {
        return cy.xpath(this.problemTypeVisibleLocator);
    }
    private get countForProblemType() {
        return cy.xpath(this.countForProblemTypeLocator);
    }
    private get whereFieldVisible() {
        return cy.xpath(this.whereFieldVisibleLocator);
    }
    private get countWhereFieldType() {
        return cy.xpath(this.countWhereFieldTypeLocator);
    }
    private get shortDescriptionFieldVisible() {
        return cy.xpath(this.shortDescriptionFieldVisibleLocator);
    }
    private get fullDescriptionFieldVisible() {
        return cy.xpath(this.fullDescriptionFieldVisibleLocator);
    }
    private get inputFieldForCaptcha() {
        return cy.xpath(this.inputFieldForCaptchaLocator);
    }
    private get captchaNumberVisible() {
        return cy.xpath(this.captchaNumberVisibleLocator);
    }
    private get addButtonExists() {
        return cy.xpath(this.addButtonExistsLocator);
    }

    // Методы взаимодействия с ними
    supportClientsPage() {
        this.supportClientsPageOpen.click();
    }
    supportRequestPage() {
        this.supportRequestPageOpen.should("have.text", supportRequestPageTitle);
    }
    enterUserNameField() {
        this.setUserNameField.type(userName);
    }
    verifyNameFieldEntered() {
        this.nameFieldEntered.should('not.be.empty');
    }
    deleteName() {
        this.deleteNameTest.get('#id_name').clear({force: true})
    }
    clickOnEmptyField() {
        this.clickOnAnyEmptyField.click();
    }
    anonymousVisibleName() {
        this.anonymousVisibleNameField.should("have.value", anonymousName);
    }
    setValueIntoEmail() {
        this.setValueIntoEmailField.type(invalidEmail);
    }
    emailFieldRed() { //Поле выделено красным
        cy.get('input#id_email.i-p.error').should('have.css', 'border-color', 'rgb(255, 0, 0)');
    }
    setCorrectValuIntoEmail() {
        this.setValueIntoEmailField.type(validEmail);
    }
    clickAgainOnEmptyField() { //убрать фокус с поля
        this.clickOnAnyEmptyField.click();
    }
    emailNotHaveFieldRed() { //Выделение снято
        cy.get('input#id_email.i-p.valid').should('not.have.css', 'border-color', 'rgb(255, 0, 0)');
    }
    problemType() {
        this.problemTypeVisible.should("be.visible");
    }
    countForProblemTypeDropdown() {
        this.countForProblemType.get("#id_type option").should('have.length.gt', 1);
    }
    whereField() {
        this.whereFieldVisible.should("be.visible");
    }
    countWhereFieldDropdown() {
        this.countWhereFieldType.get("#id_project option").should('have.length.gt', 1);
    }
    shortDescriptionField() {
        this.shortDescriptionFieldVisible.should("have.text", shortDescription);
    }
    fullDescriptionField() {
        this.fullDescriptionFieldVisible.should("have.text", fullDescription);
    }
    inputFieldCaptcha() {
        this.inputFieldForCaptcha.should("be.visible");
    }
    captchaNumber() {
        this.captchaNumberVisible.should("be.visible");
    }
    addButton() {
        this.addButtonExists.should("be.visible");
    }
}

export const supportPage = new SupportPage();