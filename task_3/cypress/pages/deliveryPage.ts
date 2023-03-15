import 'cypress-xpath';
import {
    checkout,
    halvaCard,
    houseNumber,
    inCartButton,
    nameProduct,
    countCartProducts,
    numberNearCart,
    offlinePay,
    onlineCard,
    phoneNumber,
    priceProduct,
    sellerOffers,
    streetName,
    userName,
} from '../fixtures/deliveryData';

class DeliveryPage {
    // Локаторы
    private searchFrameContainerLocator = '//iframe[@class="modal-iframe"]'; //это i-frame поиска
    private productTitlePageLocator = "//div//h1[contains(@class, 'catalog-masthead__title')]"; //Открыта страница товара
    private openSellersOffersPageLocator = "(//a[@class='js-sub-nav-link'])[2]"; //Перейти на вкладку "Предложения продавцов"
    private sellersOffersPageTitleLocator = "//li[@class='item selected']"; //Открыта вкладка "Предложения продавцов"
    private growingPriceFilterLocator = "(//select[@class='input-style__real']/option)[2]"; //Сортировка по возрастанию цены
    private productTitleLocator = "//div//h1[contains(@class, 'catalog-masthead__title')]"; //Название товара со страницы
    private productPriceLocator = "(//div[contains(@class, 'offers-list__description')])[4]"; //Цена товара со страницы
    private putProductIntoCartLocator = "(//a[contains(@class, 'offers-list__button')])[3]"; //Нажать "В корзину" для самого выгодного продавца
    private closePopupButtonLocator = "(//div[contains(@class, 'offers-form__control')]//span)[3]"; //На странице отображается поп-ап поверх всего, закрываем его
    private numberNearCartLocator = "(//span[@class='b-top-profile__counter'])[3]"; //Цифра 1 отображается около значка корзины в верхней части страницы
    private openCartTopButtonLocator = "//a[@class='b-top-profile__cart']"; //Перейти в корзину нажатием на значок корзины
    private oneProductDisplayedInCartLocator = "(//div[contains(@class, 'cart-form__description_extended')])[1]"; //В корзине отображается один товар
    private productCartTitleLocator = "(//div//a[contains(@class, 'cart-form__link')])[2]"; //Название товара в корзине
    private productCartPriceLocator = "(//div[contains(@class, 'cart-form__description')])[9]"; //Цеана товара в корзине
    private goToCheckoutPageLocator = "(//div[@class='cart-form__control'])[3]"; //Нажать на кнопку "Перейти к оформлению"
    private checkoutPageTitleLocator = "(//div[contains(@class,'cart-form__title')])[1]"; //Открыта страница "Оформление заказа
    private productOrderTitleLocator = "(//div[contains(@class, 'cart-form__description-part_1')])[5]"; //Название товара в оформлении заказа
    private productOrderPriceLocator = "//div[contains(@class, 'cart-form__description_ellipsis')]"; //Цена товара в оформлении заказа
    private goToMakePurchaseButtonLocator = "//div//button[contains(@class, 'button-style')]"; //Нажать "Перейти к способу оплаты"
    private onlinePaymentLocator = "//div[@id='anchor-item_online_card']"; //Картой онлайн
    private halvaPaymentLocator = "//div[@id='anchor-item_online_installment_card']"; //Халвой онлайн
    private whenDeliveryPaymentLocator = "//div[@id='anchor-item_offline']"; //При получении
    private makeOrderButtonLocator = "//div/button[contains(@class, 'button-style')]"; //Отображается кнопка "Перейти к подтверждению заказа"
    private changeOrderButtonLocator = "(//div/a[contains(@class, 'cart-form__link')])[2]"; //Вернуться к корзине
    private deleteFromCartLocator = "(//div//a[contains(@class, 'button-style')])[1]"; //Очистить корзину

    // Веб-элементы (приватные)
    private get productTitlePage() {
        return cy.xpath(this.productTitlePageLocator);
    }
    private get openSellersOffersPage() {
        return cy.xpath(this.openSellersOffersPageLocator);
    }
    private get sellersOffersPageTitle() {
        return cy.xpath(this.sellersOffersPageTitleLocator);
    }
    private get growingPriceFilter() {
        return cy.xpath(this.growingPriceFilterLocator);
    }
    private get productTitle() {
        return cy.xpath(this.productTitleLocator);
    }
    private get productPrice() {
        return cy.xpath(this.productPriceLocator);
    }
    private get putProductIntoCart() {
        return cy.xpath(this.putProductIntoCartLocator);
    }
    private get closePopupButton() {
        return cy.xpath(this.closePopupButtonLocator);
    }
    private get numberNearCart() {
        return cy.xpath(this.numberNearCartLocator);
    }
    private get openCartTopButton() {
        return cy.xpath(this.openCartTopButtonLocator);
    }
    private get oneProductDisplayedInCart() {
        return cy.xpath(this.oneProductDisplayedInCartLocator);
    }
    private get productCartTitle() {
        return cy.xpath(this.productCartTitleLocator);
    }
    private get productCartPrice() {
        return cy.xpath(this.productCartPriceLocator);
    }
    private get goToCheckoutPage() {
        return cy.xpath(this.goToCheckoutPageLocator);
    }
    private get checkoutPageTitle() {
        return cy.xpath(this.checkoutPageTitleLocator);
    }
    private get productOrderTitle() {
        return cy.xpath(this.productOrderTitleLocator);
    }
    private get productOrderPrice() {
        return cy.xpath(this.productOrderPriceLocator);
    }
    private get goToMakePurchaseButton() {
        return cy.xpath(this.goToMakePurchaseButtonLocator);
    }
    private get onlinePayment() {
        return cy.xpath(this.onlinePaymentLocator);
    }
    private get halvaPayment() {
        return cy.xpath(this.halvaPaymentLocator);
    }
    private get whenDeliveryPayment() {
        return cy.xpath(this.whenDeliveryPaymentLocator);
    }
    private get makeOrderButton() {
        return cy.xpath(this.makeOrderButtonLocator);
    }
    private get changeOrderButton() {
        return cy.xpath(this.changeOrderButtonLocator);
    }
    private get deleteFromCart() {
        return cy.xpath(this.deleteFromCartLocator);
    }

    // Методы взаимодействия с ними
    searchNewProduct() {
        //Открыть страницу товара (ч/з поиск)
        cy.getIFrameBody(this.searchFrameContainerLocator).then(($iframe) => {
            cy.wrap($iframe)
                .get('input.fast-search__input')
                .type(nameProduct, { delay: 0 });
            cy.wait(5000); //потому что не успевает обработать и найти
            cy.wrap($iframe)
                .find('div.result__item.result__item_product')
                .click(); //a.product__title-link
        });
    }
    productTitleMakita() {
        this.productTitlePage.should('contain.text', nameProduct);
    }
    sellersOffersPage() {
        this.openSellersOffersPage.click();
    }
    sellersOffersTitle() {
        this.sellersOffersPageTitle.should('contain.text', sellerOffers);
    }
    closePopup() {
        this.closePopupButton.click({ force: true });
    }
    growingPrice() {
        this.growingPriceFilter.get('.input-style__real').select('price:asc');
    }
    verifyProductTitle() {
        this.productTitle.should('contain.text', nameProduct);
    }
    verifyProductPrice() {
        this.productPrice.should('contain.text', priceProduct);
    }
    addProductIntoCart() {
        cy.wait(3000);
        this.putProductIntoCart.click({ force: true });
    }
    inCartButton() {
        //"В корзине" отображается вместо нажатой кнопки
        this.putProductIntoCart.should('contain.text', inCartButton);
    }
    verifyNumberNearCart() {
        this.numberNearCart.should('contain.text', numberNearCart);
    }
    openCartTop() {
        this.openCartTopButton.click({ force: true });
    }
    oneProductDisplayed() {
        this.oneProductDisplayedInCart.should(
            'contain.text',
            countCartProducts
        );
    }
    verifyProductCartTitle() {
        this.productCartTitle.should('contain.text', nameProduct);
    }
    verifyProductCartPrice() {
        this.productCartPrice.should('contain.text', priceProduct);
    }
    toCheckoutPage() {
        this.goToCheckoutPage.click();
    }
    checkoutTitle() {
        this.checkoutPageTitle.should('contain.text', checkout);
    }
    verifyProductOrderTitle() {
        this.productOrderTitle.should('contain.text', nameProduct);
    }
    verifyProductOrderPrice() {
        this.productOrderPrice.should('contain', priceProduct);
    }
    setAllRequieredFields() {
        //Заполнить поля адреса, поля контактов
        cy.get('.auth-input.auth-input_primary').eq(1).type(streetName);
        cy.get('div.auth-dropdown').click();
        cy.get('.input-style.input-style_primary').eq(0).type(houseNumber);
        cy.get('.input-style.input-style_primary').eq(6).type(userName);
        cy.get('.input-style.input-style_primary').eq(9).type(phoneNumber);
    }
    goToMakePurchase() {
        this.goToMakePurchaseButton.click();
    }
    onlineCardPayment() {
        this.onlinePayment.should('contain.text', onlineCard);
    }
    halvaCardPayment() {
        this.halvaPayment.should('contain.text', halvaCard);
    }
    offlinePayment() {
        this.whenDeliveryPayment.should('contain.text', offlinePay);
        cy.get('.cart-form__anchor-item_active').should(
            'contain.text',
            offlinePay
        );
    }
    makeOrder() {
        this.makeOrderButton.should('be.visible');
    }
    changeOrder() {
        this.changeOrderButton.click();
    }
    makeCartEmpty() {
        this.deleteFromCart.click({ force: true });
    }
}

export const deliveryPage = new DeliveryPage();