import 'cypress-xpath';
import {
    enterMaxPrice,
    roomText,
    titlePageRent,
    twoRoom,
} from '../fixtures/catalogData';

class CatalogPage {
    //Вспомогательные переменные
    private flatAdress: string = '';
    private expectedFisrtCount: number = 0;
    private flatFilterCount: number = 0;
    private twoRoomFilterCount: number = 0;
    private costFilterCount: number = 0;

    //Локаторы
    private selectHousesAndFlatsLocator = "(//span[@class='b-main-navigation__text'])[4]"; //"Дома и квартиры"
    private selectRentLocator = "(//a[@class='b-main-navigation__dropdown-title-link'])[8]"; //"Аренда"
    private selectMinskRentPageLocator = "(//span[@class='b-main-navigation__dropdown-advert-sign'])[50]"; //"Минск"
    private rentPageTitleLocator = "(//span[@class='project-navigation__sign'])[2]"; //Страница каталога недвижимости открыта
    private catalogMapVisibleLocator = "//div[@id='map']"; //Отображается карта
    private roomIsVisibleBeforeFilterLocator = "(//span[contains(@class, 'classified__caption-item')])[1]"; //КОМНАТЫ ИЗНАЧАЛЬНО ОТОБРАЖАЮТСЯ
    private selectFlatsInFilterLocator = "(//span[@class='filter__item-inner'])[1]"; //Выбрать фильтр "Квартира"
    private noRoomVisibleAfterFilterLocator = "//span[contains(@class, 'classified__caption-item')]"; //Отображаюстся только объявления, помеченные "1к, 2к, 3к, 4к", но не "Комната"
    private selectTwoFlatLocator = "(//span[@class='filter__item-inner'])[4]"; //Выбрать только 2-комнатные квартиры
    private enterPriceFiveHundredLocator = "//div//input[@id='search-filter-price-to']"; //Установить цену до 500$
    private clickOnEmptySpaceLocator = "//div//input[@id='search-filter-price-from']";
    private clickOnMetroSelectorLocator = "//div[contains(@class, 'dropdown_2')]"; //Выбрать "Метро"
    private selectNearMetroValueLocator = "(//li[@class='dropdown__item'])[2]"; //"Возле метро"
    private sortOnPageLocator = "(//div[@class='dropdown__value'])[3]";
    private selectExpensiveFlatLocator = "(//li[@class='dropdown__item'])[7]"; //Выбрать сортировку "Сначала дорогие"

    //веб-элементы
    private get selectHousesAndFlats() {
        return cy.xpath(this.selectHousesAndFlatsLocator);
    }
    private get selectRent() {
        return cy.xpath(this.selectRentLocator);
    }
    private get selectMinskRentPage() {
        return cy.xpath(this.selectMinskRentPageLocator);
    }
    private get rentPageTitle() {
        return cy.xpath(this.rentPageTitleLocator);
    }
    private get catalogMapVisible() {
        return cy.xpath(this.catalogMapVisibleLocator);
    }
    private get roomIsVisibleBeforeFilter() {
        return cy.xpath(this.roomIsVisibleBeforeFilterLocator);
    }
    private get selectFlatsInFilter() {
        return cy.xpath(this.selectFlatsInFilterLocator);
    }
    private get noRoomVisibleAfterFilter() {
        return cy.xpath(this.noRoomVisibleAfterFilterLocator);
    }
    private get selectTwoFlat() {
        return cy.xpath(this.selectTwoFlatLocator);
    }
    private get clickOnEmptySpace() {
        return cy.xpath(this.clickOnEmptySpaceLocator);
    }
    private get enterPriceFiveHundred() {
        return cy.xpath(this.enterPriceFiveHundredLocator);
    }
    private get clickOnMetroSelector() {
        return cy.xpath(this.clickOnMetroSelectorLocator);
    }
    private get selectNearMetroValue() {
        return cy.xpath(this.selectNearMetroValueLocator);
    }
    private get sortOnPage() {
        return cy.xpath(this.sortOnPageLocator);
    }
    private get selectExpensiveFlat() {
        return cy.xpath(this.selectExpensiveFlatLocator);
    }

    //методы взаимодействия с ними
    housesAndFlatsPage() {
        this.selectHousesAndFlats.trigger('mouseover');
    }
    chooseRent() {
        this.selectRent.trigger('mouseover');
    }
    minskRentPage() {
        this.selectMinskRentPage.click();
    }
    rentTitle() {
        this.rentPageTitle.should('have.text', titlePageRent);
    }
    catalogMap() {
        this.catalogMapVisible.should('be.visible');
    }
    verifyRoomIsVisibleBeforeFilter() {
        this.roomIsVisibleBeforeFilter.should('be.visible', roomText);
    }
    getAdsCount() {
        //НАЧАЛЬНОЕ ЧИСЛО ОБЪЯВЛЕНИЙ
        cy.get('div.classifieds-bar__item')
            .invoke('text')
            .then(($text) => {
                let totalCountValue: number = parseInt(
                    $text.replace(/[^0-9]/g, ''),
                    10
                );
                cy.log(totalCountValue.toString());
                this.expectedFisrtCount = totalCountValue;
            });
    }
    flatsInFilter() {
        this.selectFlatsInFilter.click();
    }
    verifyNoRoomVisibleAfterFilter() {
        this.noRoomVisibleAfterFilter.should('not.have.text', roomText);
    }
    getAdsCountFlatFilter() {
        //После применения фильтра "Квартира"
        cy.wait(1000);
        cy.get('div.classifieds-bar__item')
            .invoke('text')
            .then(($countSecond) => {
                let countSecond: number = parseInt(
                    $countSecond.replace(/[^0-9]/g, ''),
                    10
                );
                expect(countSecond).to.be.lessThan(this.expectedFisrtCount);
                this.flatFilterCount = countSecond
                cy.log(countSecond.toString());
            });
    }
    selectTwoRoomFlats() {
        this.selectTwoFlat.click();
    }
    filetredTwoNumberResults() {
        //После применения фильтра "2-комнатные квартиры"
        cy.wait(1000);
        cy.get('div.classifieds-bar__item')
            .invoke('text')
            .then(($countThird) => {
                let countThird: number = parseInt(
                    $countThird.replace(/[^0-9]/g, ''),
                    10
                );
                expect(countThird).to.be.lessThan(this.flatFilterCount);
                this.twoRoomFilterCount = countThird
                cy.log(countThird.toString());
            });
    }
    onlyTwoRoomFlatsDisplaed() {
        //Отображаюстся только объявления, помеченные "2к"
        cy.wait(1000);
        cy.get(
            'span.classified__caption-item.classified__caption-item_type'
        ).each((el) => {
            const text = el.text();
            expect(text).to.contain(twoRoom);
        });
    }
    enterPrice() {
        this.enterPriceFiveHundred.type(enterMaxPrice);
    }
    onEmptySpace() {
        this.clickOnEmptySpace.click();
    }
    filetredPriceResults() {
        //После применения фильтра "Стоимость"
        cy.wait(1000);
        cy.get('div.classifieds-bar__item')
            .invoke('text')
            .then(($countPrice) => {
                let countPrice: number = parseInt(
                    $countPrice.replace(/[^0-9]/g, ''),
                    10
                );
                expect(countPrice).to.be.lessThan(this.twoRoomFilterCount);
                this.costFilterCount = countPrice;
                cy.log(countPrice.toString());
            });
    }
    validPriceSelected() {
        // Кол-во результатов на странице уменьшилось, отображаюстся только объявления, цена в $ которых <= 500$
        cy.wait(1000);
        cy.get(
            'span.classified__price-value.classified__price-value_complementary'
        ).each(($el) => {
            let price: number = parseInt($el.text().replace(/[^0-9]/g, ''), 10);
            expect(price).to.be.at.most(500);
        });
    }
    clickOnMetro() {
        this.clickOnMetroSelector.click();
    }
    nearMetroValue() {
        this.selectNearMetroValue.click();
    }
    filetredMetroResults() {
        //После применения фильтра "Метро"
        cy.wait(1000);
        cy.get('div.classifieds-bar__item')
            .invoke('text')
            .then(($countMetro) => {
                let countMetro: number = parseInt(
                    $countMetro.replace(/[^0-9]/g, ''),
                    10
                );
                expect(countMetro).to.be.lessThan(this.costFilterCount);
                cy.log(countMetro.toString());
            });
    }
    getValueFlatBeforeSorting() {
        cy.wait(1000);
        cy.get('.classified__caption-item_adress')
            .eq(0)
            .invoke('text')
            .then((text) => {
                this.flatAdress = text;
                cy.log(this.flatAdress);
            });
    }
    pageSorting() {
        this.sortOnPage.click();
    }
    expensiveFlat() {
        this.selectExpensiveFlat.click();
    }
    checkFlatAfterSorting() {
        cy.wait(1000);
        cy.get('.classified__caption-item_adress')
            .eq(0)
            .invoke('text')
            .then((text) => {
                let flatAdressAfterSorting = text;
                expect(flatAdressAfterSorting).not.eq(this.flatAdress);
        cy.log(flatAdressAfterSorting);
        });        
    }
}

export const catalogPage = new CatalogPage();
