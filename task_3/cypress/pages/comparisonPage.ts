import "cypress-xpath";
import { addedCheckbox, comparisonPageTitle, firstTvName, oneProductAdded, secondTvName, twoProductsAdded } from "../fixtures/comparisonData";

class ComparisonPage {
    // локаторы
    private openCatalogLocator = "(//span[@class='b-main-navigation__text'])[1]"; //Перейти на вкладку "Каталог"
    private selectElectronicsTabLocator = "//li[@data-id='1']"; //Выбрать раздел "Электроника"	
    private selectTvVideoLocator = "(//div[contains(@class, 'catalog-navigation-list__aside-title')])[23]";
    private selectTvTabLocator = "(//a[contains(@href, 'catalog.onliner.by/tv')]//span[contains(@class, 'catalog-navigation-list__dropdown-data')])[2]"; ////Выбрать раздел "телевизоры"
    private selectFirstTvOnPageLocator = "(//a[@class='js-product-title-link'])[1]"; //Кликнуть на название первого телевизора и перейти на страницу с описанием
    private addFirstTvToCompareLocator = "(//span[@class='i-checkbox__faux'])[1]"; //Напротив названия телевизора отметить чек-бокс "Добавить к сравнению"
    private verifyCheckBoxSelectedLocator = "(//span[contains(@class, 'catalog-masthead-controls__text')])[1]" //Чек-бокс отмечен
    private fisrtTvIsAddedToCompareLocator = "(//div[contains(@class, 'compare-button__state')]//a//span)[2]"; //Появилась плашка "1 товар в сравнении"
    private returnTvCatalogLocator = "(//a[contains(@class, 'breadcrumbs__link')])[2]"; //Вернуться к списку со всеми телевизорами
    private selectSecondTvOnPageLocator = "(//a[contains(@class, 'js-product-title-link')])[5]"; //Выбрать второй телевизор
    private addSecondTvToCompareLocator = "(//span[@class='i-checkbox__faux'])[1]"; //отметить чек-бокс "Добавить к сравнению"
    private secondTvIsAddedToCompareLocator = "(//div[contains(@class, 'compare-button__state')]//a//span)[2]"; // //Появилась плашка "2 товара в сравнении"
    private popupForComparisonLocator = "(//a[contains(@class, 'compare-button__sub')])[2]"; //появившийся поп-ап с названием "2 товара в сравнении
    private pageComparisonProductsPagLocator = "//div//h1"; //Сравнение товаров
    private fisrtTvIsAddedLocator = "(//span[contains(@class, 'product-summary__caption')])[1]"; //первый телевизор
    private secondTvIsAddedLocator = "(//span[contains(@class, 'product-summary__caption')])[4]"; //второй телевизор

    //Веб-элементы
    private get catalogLocator() {
        return cy.xpath(this.openCatalogLocator)
    }
    private get selectElectronicsTab() {
        return cy.xpath(this.selectElectronicsTabLocator)
    }
    private get selectTvVideo() {
        return cy.xpath(this.selectTvVideoLocator)
    }
    private get selectTvTab() {
        return cy.xpath(this.selectTvTabLocator)
    }
    private get selectFirstTvOnPage() {
        return cy.xpath(this.selectFirstTvOnPageLocator)
    }
    private get addFirstTvToCompare() {
        return cy.xpath(this.addFirstTvToCompareLocator)
    }
    private get verifyCheckBoxSelected() {
        return cy.xpath(this.verifyCheckBoxSelectedLocator)
    }
    private get fisrtTvIsAddedToCompare() {
        return cy.xpath(this.fisrtTvIsAddedToCompareLocator)
    }
    private get returnTvCatalog() {
        return cy.xpath(this.returnTvCatalogLocator)
    }
    private get selectSecondTvOnPage() {
        return cy.xpath(this.selectSecondTvOnPageLocator)
    }
    private get addSecondTvToCompare() {
        return cy.xpath(this.addSecondTvToCompareLocator)
    }
    private get secondTvIsAddedToCompare() {
        return cy.xpath(this.secondTvIsAddedToCompareLocator)
    }
    private get popupForComparison() {
        return cy.xpath(this.popupForComparisonLocator)
    }
    private get comparisonProductsPage() {
        return cy.xpath(this.pageComparisonProductsPagLocator)
    }
    private get fisrtTvExists() {
        return cy.xpath(this.fisrtTvIsAddedLocator)
    }
    private get secondTvExists() {
        return cy.xpath(this.secondTvIsAddedLocator)
    }

    //Методы взаимодействия с ними
    catalogLocatorOpens() {
        this.catalogLocator.click();
    }
    electronicsTabOpens() {
        this.selectElectronicsTab.click();
    }
    tvVideoTab() {
        this.selectTvVideo.trigger('mouseover');
    }
    TvTabOpens() {
        this.selectTvTab.click();
    }
    firstTvPageOpens() {
        this.selectFirstTvOnPage.click();
    }
    firstTvToCompare() {
        this.addFirstTvToCompare.click();
    }
    checkBoxSelected() {
        this.verifyCheckBoxSelected.should("have.text", addedCheckbox);
    }
    fisrtTvIsAdded() {
        this.fisrtTvIsAddedToCompare.should("have.text", oneProductAdded);
    }    
    tvCatalogReturnOpens() {
        this.returnTvCatalog.click();
    }
    secondTvPageOpens() {
        this.selectSecondTvOnPage.click();
    }
    verifySecondTvAddedToCompare() {
        this.addSecondTvToCompare.click();
    }
    secondTvIsAdded() {
        this.secondTvIsAddedToCompare.should("have.text", twoProductsAdded);
    }
    popupComparison() {
        this.popupForComparison.click();
    }
    comparisonProductsPageOpens() {
        this.comparisonProductsPage.should("have.text", comparisonPageTitle);
    }
    fisrtTvTitleExists() {
        this.fisrtTvExists.should("have.text", firstTvName);
    }
    secondTvTitleExists() {
        this.secondTvExists.should("have.text", secondTvName);
    }
    checkBoxDifference() { //Отличающиеся характеристики должны быть подсвечены оранжевым цветом
        cy.get('.product-table__cell_accent').should('have.css', 'background-color', 'rgb(255, 236, 196)');
    }
}

export const comparisonPage = new ComparisonPage ();