import 'cypress-xpath';
import { memoryCards, productName } from '../fixtures/searchData';

class SearchPage {
    // Локаторы
    private searchFrameContainerLocator = '//iframe[@class="modal-iframe"]'; //это i-frame поиска
    private productPriceLocator = "//a[contains(@class, 'product__price-value')]"; //для него отображается цена
    private offersButtonLocator = "//a[contains(@class, 'button_orange')]"; //кнопка "Предложения"
    private productTitlePageLocator = "//div//h1[contains(@class, 'catalog-masthead__title')]"; //Открыта страница товара, название соответствует искомому

    // Веб-элементы (приватные)
    private get productTitlePage() {
        return cy.xpath(this.productTitlePageLocator);
    }

    // Методы взаимодействия с ними
    searchMemoryCard() {
        //Ввести в поле поиска "Карты памяти"
        cy.getIFrameBody(this.searchFrameContainerLocator).then(($iframe) => {
            cy.wrap($iframe)
                .get('input.fast-search__input')
                .type(memoryCards, { delay: 0 });
        });
    }
    verifyMemoryCard() {
        //Открылся попап поиска, среди результатов поиска присутствует ссылка на соответствующую категорию
        cy.getIFrameBody(this.searchFrameContainerLocator).then(($iframe) => {
            cy.wrap($iframe)
                .find('a.category__title')
                .eq(0)
                .should('contain.text', memoryCards);
        });
    }
    clearSearchField() {
        //Очистить поле поиска - Результаты поиска не отображаются
        cy.getIFrameBody(this.searchFrameContainerLocator).then(($iframe) => {
            cy.wrap($iframe)
                .find('input.search__input')
                .clear({ force: true })
                .should('be.empty');
        });
    }
    searchNewProduct() {
        //Ввести название товара (любой уникальный)
        cy.getIFrameBody(this.searchFrameContainerLocator).then(($iframe) => {
            cy.wrap($iframe)
                .find('input.search__input')
                .type(productName, { delay: 0 });
        });
    }
    verifyNewProductSelected() {
        cy.getIFrameBody(this.searchFrameContainerLocator).then(($iframe) => {
            cy.wrap($iframe)
                .find('a.product__title-link')
                .should('contain.text', productName);
            cy.wrap($iframe)
                .xpath(this.productPriceLocator).should('be.visible')
                .xpath(this.offersButtonLocator).should('be.visible');
            cy.wrap($iframe).find('a.product__title-link').click();
        });
    }
    verifyProductTitle() { //Открыта страница товара, название соответствует искомому
        this.productTitlePage.should('contain.text', productName);
    }
}

export const searchPage = new SearchPage();