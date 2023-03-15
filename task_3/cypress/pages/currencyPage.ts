import 'cypress-xpath';
import { currencyTitle, inputValue, invalidInput } from '../fixtures/currencyData';

class CurrencyPage {
    // локаторы
    private currencyPageOpensLocator =
        "//span[contains(@class, '_u js-currency-amount')]"; //На главной странице нажать на ссылку с курсом доллара
    private currencyTitlePageLocator = '//div//h1'; //Открыта страница "Лучшие курсы валют"
    private currentDateIsDispalyedLocator = "//tr//th[@class='th-first']"; //отображается сегодняшняя дата
    private buyButtonClickLocator = "//li//label[@for='buy']"; //Нажать кнопку "Купить" в конвертере
    private typeTextConverterFieldLocator = "(//div//input[@type='text'])[2]"; //Попробовать ввести текст в поле конвертера
    private defaultValueInputLocator = "//div//input[@value='100']"; //отображается стандартное "100"
    private currencyInDropdownSelectLocator = "//*[@id='currency-in']/option[1]"; //кликнуть на дропдаун
    private newCurrencyInLocator = "//*[@id='currency-in']/option[2]"; //Выбрать валюту EUR
    private currencyResultInBynLocator = "//li[@class='result to-be-removed']//span"; //Справа в конвертере подсчитано значение в BYN
        
    //Веб-эелементы
    private get currencyPageOpens() {
        return cy.xpath(this.currencyPageOpensLocator);
    }
    private get currencyTitlePage() {
        return cy.xpath(this.currencyTitlePageLocator);
    }
    private get currentDateIsDispalyed() {
        return cy.xpath(this.currentDateIsDispalyedLocator);
    }
    private get buyButtonClick() {
        return cy.xpath(this.buyButtonClickLocator);
    }
    private get typeTextConverterField() {
        return cy.xpath(this.typeTextConverterFieldLocator);
    }
    private get defaultValueInput() {
        return cy.xpath(this.defaultValueInputLocator);
    }
    private get CurrencyInDropdownSelect() {
        return cy.xpath(this.currencyInDropdownSelectLocator);
    }
    private get NewCurrencyIn() {
        return cy.xpath(this.newCurrencyInLocator);
    }
    private get currencyResultInByn() {
        return cy.xpath(this.currencyResultInBynLocator);
    }

    //Методы взаимодействия с ними
    currencyPage() {
        this.currencyPageOpens.click();
    }
    verifyCurrencyTitleShown() {
        this.currencyTitlePage.should('contain.text', currencyTitle);
    }
    currentDate() {
        const date = new Date();
        let today = date.toLocaleString('ru-RU', { day: 'numeric', month: 'long', });
        this.currentDateIsDispalyed.should('contain.text', today);
    }
    threeCurrency() { //отображаются разделы курсов для USD, EUR, RUB
        cy.contains('.b-currency-table__best', 'USD').should('contain', 'USD');
        cy.contains('.b-currency-table__best', 'EUR').should('contain', 'EUR');
        cy.contains('.b-currency-table__best', 'RUB').should('contain', 'RUB');
    }
    buyButton() {
        this.buyButtonClick.click();
    }
    textConverterField() {
        this.typeTextConverterField.type(invalidInput);
    }
    defaultValue() {
        this.defaultValueInput.should('have.value', '100');
    }
    typeRandomNumber() {
        cy.get('input#amount-in')
            .clear()
            .type(inputValue.toString())
            .should('have.value', inputValue);
    }
    defaultCurrencyInDropdown() {
        this.CurrencyInDropdownSelect.get('select#currency-in').should('have.value', 'usd');
    }
    newCurrencyIn() {
        this.NewCurrencyIn.get('select#currency-in').select('EUR').should('have.value', 'eur');
    }
    currencyResultByn() {
        this.currencyResultInByn.should('have.text', 'BYN');
    }
    resultNumberCurrency() { //Проверить, что подсчитанное значение = введенное * курс EUR из раздела "Банк продает"
        cy.get('p.value.rise b')
            .eq(1) //может измениться
            .then((cell) => {
                const bankValue = cell.text().replace(',', '.'); // 3.0080
                const randomNumber = inputValue;

                cy.get('b.js-cur-result').then((number) => {
                    const expectedValue: number = parseFloat(
                        number.text().replace(',', '.')
                    );
                    const newValue = parseFloat(bankValue) * randomNumber;
                    cy.log(expectedValue.toFixed(3));
                    cy.log(newValue.toFixed(3));
                    expect(expectedValue.toFixed(3)).equal(newValue.toFixed(3));
                });
            });
        }
    }

export const currencyPage = new CurrencyPage();