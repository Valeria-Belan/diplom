import 'cypress-xpath';
import { filterAsus, laptopPageTitle, matrixFrequency, superpriceFilter } from '../fixtures/filterData';

class FilterPage {
     //Вспомогательные переменные
     private numberOfProducts: number = 0;
     private countAsusFilter: number = 0;

    // Локаторы
    private openCatalogLocator = "(//span[@class='b-main-navigation__text'])[1]"; //Перейти на вкладку "Каталог"
    private openComputersAndWebLocator = "(//span[@class='catalog-navigation-classifier__item-title'])[3]"; //Перейти в категорию "Компьютеры и сети"
    private selectLaptopsAndOthersLocator = "(//div[@class='catalog-navigation-list__aside-title'])[10]"; //"Ноутбуки и комплектующие"
    private openLaptopsPageLocator = "(//a[contains(@href, '://catalog.onliner.by/notebook')])[4]"; //"Ноутбуки"
    private laptopsPageTitleLocator = "//h1[contains(@class, 'schema-header__title')]"; //Открыта страница каталога "Ноутбуки". Заголовок страницы = "Ноутбуки"
    private clickOnFilterAsusLocator = "(//span[@class='i-checkbox__faux'])[5]"; //Установить Производитель = ASUS
    private filterAsusAppearedLocator = "(//span[@class='schema-tags__text'])[1]"; //В верхней части страницы появился фильтр "ASUS"
    private clickOnFirstSelectorMatrixLocator = "(//select[contains(@class, 'schema-filter-control__item')])[9]"; //Установить Частота матрицы от 120 до 165 Гц
    private setFisrtMatrixLocator = "(//select[@class='schema-filter-control__item']/option[text()='120 Гц'])[1]"; //Установить Частота матрицы от 120 до 165 Гц
    private clickOnSecondSelectorMatrixLocator = "(//select[contains(@class, 'schema-filter-control__item')])[10]"; //Установить Частота матрицы от 120 до 165 Гц
    private setSecondMatrixLocator = "(//select[@class='schema-filter-control__item']/option[text()='165 Гц'])[2]"; //Установить Частота матрицы от 120 до 165 Гц
    private filterForMatrixAppearedLocator = "(//span[@class='schema-tags__text'])[2]"; //В верхней части страницы появился фильтр "120 - 165 Гц"
    private getSuperPriceFilterLocator = "(//div[@class='i-checkbox__faux'])[3]"; //Применить фильтр "Суперцена"
    private superPriceFilterAppearedLocator = "(//span[@class='schema-tags__text'])[1]"; //В верхней части страницы появился фильтр "Суперцена"
    private signSuperPriceProductsLocator = "//div[@class='schema-product__hot']"; //Отображаются только товары со значком "Суперцена"
    private closeFilterAsusLocator = "(//span[@class='schema-tags__text'])[2]"; //Удалить фильтр "ASUS"

    // Веб-элементы (приватные)
    private get catalogLocator() {
        return cy.xpath(this.openCatalogLocator);
    }
    private get openComputersAndWeb() {
        return cy.xpath(this.openComputersAndWebLocator);
    }
    private get selectLaptopsAndOthers() {
        return cy.xpath(this.selectLaptopsAndOthersLocator);
    }
    private get openLaptopsPage() {
        return cy.xpath(this.openLaptopsPageLocator);
    }
    private get laptopsPageTitle() {
        return cy.xpath(this.laptopsPageTitleLocator);
    }
    private get clickOnFilterAsus() {
        return cy.xpath(this.clickOnFilterAsusLocator);
    }
    private get filterAsusAppeared() {
        return cy.xpath(this.filterAsusAppearedLocator);
    }
    private get clickOnFirstSelectorMatrix() {
        return cy.xpath(this.clickOnFirstSelectorMatrixLocator);
    }
    private get setFisrtMatrix() {
        return cy.xpath(this.setFisrtMatrixLocator);
    }
    private get clickOnSecondSelectorMatrix() {
        return cy.xpath(this.clickOnSecondSelectorMatrixLocator);
    }
    private get setSecondMatrix() {
        return cy.xpath(this.setSecondMatrixLocator);
    }
    private get filterForMatrixAppeared() {
        return cy.xpath(this.filterForMatrixAppearedLocator);
    }
    private get getSuperPriceFilter() {
        return cy.xpath(this.getSuperPriceFilterLocator);
    }
    private get superPriceFilterAppeared() {
        return cy.xpath(this.superPriceFilterAppearedLocator);
    }
    private get signSuperPriceProducts() {
        return cy.xpath(this.signSuperPriceProductsLocator);
    }
    private get closeFilterAsus() {
        return cy.xpath(this.closeFilterAsusLocator);
    }

    //Методы взаимодействия с ними
    catalogLocatorOpens() {
        this.catalogLocator.click();
    }
    computersAndWeb() {
        this.openComputersAndWeb.click();
    }
    laptopsAndOthers() {
        this.selectLaptopsAndOthers.trigger('mouseover', { force: true });
    }
    laptopsPage() {
        this.openLaptopsPage.click({ force: true });
    }
    verifyLaptopsPageTitle() {
        this.laptopsPageTitle.should('have.text', laptopPageTitle);
    }
    getTotalProductsCount() {        
        cy.contains('Найдено')
            .invoke('text')
            .then((text) => {
                let totalCount: number = parseInt(text.replace(/[^0-9]/g, ''), 10);
                cy.log(totalCount.toString());
                this.numberOfProducts = totalCount;
            });
    }
    selectFilterAsus() {
        this.clickOnFilterAsus.click();
    }
    verifyFilterAsusAppeared() {
        this.filterAsusAppeared.should('have.text', filterAsus);
    }
    getResultAsusFilter() {
        cy.wait(1000);
        cy.contains('Найдено')
            .invoke('text')
            .then((text) => {
                let afterAsusSelecting: number = parseInt(text.replace(/[^0-9]/g, ''), 10);
                expect(afterAsusSelecting).to.be.lessThan(this.numberOfProducts);
                this.countAsusFilter = afterAsusSelecting;
                cy.log(afterAsusSelecting.toString());
            });
    }
    firstSelectorMatrix() {
        this.clickOnFirstSelectorMatrix.get('select').should('have.value', '');
    }
    setFisrtMatrixValue() {
        this.setFisrtMatrix
            .parent('select')
            .select('120 Гц')
            .should('have.value', '120hz');
    }
    secondSelectorMatrix() {
        this.clickOnSecondSelectorMatrix.get('select').should('have.value', '');
    }
    setSecondMatrixValue() {
        this.setSecondMatrix
            .parent('select')
            .select('165 Гц')
            .should('have.value', '165hz');
    }
    filterMatrixAppeared() {
        this.filterForMatrixAppeared.should('have.text', matrixFrequency);
    }
    getReasultMatrixFilterUsage() {
        cy.wait(1000);
        cy.contains('Найдено')
            .invoke('text')
            .then((text) => {
                let afterMatrixFrequencyFiler: number = parseInt(text.replace(/[^0-9]/g, ''), 10);                
                expect(afterMatrixFrequencyFiler).to.be.lessThan(this.countAsusFilter);
                cy.log(afterMatrixFrequencyFiler.toString());
            });
    }
    superPriceFilter() {
        this.getSuperPriceFilter.click();
    }
    verifySuperPriceFilter() {
        this.superPriceFilterAppeared.should('have.text', superpriceFilter);  
    }
    signSuperPriceForAllProducts() {
        this.signSuperPriceProducts.should('exist');
        this.signSuperPriceProducts.not('not.exist');
    }
    deleteFilterAsus() {
        this.closeFilterAsus.get('.schema-tags__text').contains(filterAsus).click();
        this.closeFilterAsus.should('not.have.text', filterAsus);
    }    
}

export const filterPage = new FilterPage();