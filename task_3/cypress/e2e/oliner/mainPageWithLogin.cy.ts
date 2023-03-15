import { logIn } from '../../fixtures/loginHelper';
import { articlePage } from '../../pages/articlePage';
import { deliveryPage } from '../../pages/deliveryPage';

describe('Onliner diplom tests', () => {
    beforeEach(() => {
        cy.visit('https://www.onliner.by/');
        logIn();
    });
    it('3 - Article page //Пользователь может поставить оценку статье (Precondition: выполнен вход в аккаунт)', () => {
        articlePage.firstAutoPageArticle();
        articlePage.verifyArticlePageTitle();
        articlePage.checkCountBeforeAndAfterReaction();
        articlePage.verifyReactioSelected();
        articlePage.clickOnDisabledIcon();
        articlePage.secondClickOnSelectedIcon();
    });
    it('6 - Delivery page //Пользователь может оформить заказ (до оплаты)', () => {
        deliveryPage.searchNewProduct();
        deliveryPage.productTitleMakita();
        deliveryPage.sellersOffersPage();
        deliveryPage.sellersOffersTitle();
        deliveryPage.closePopup();
        deliveryPage.growingPrice();
        deliveryPage.verifyProductTitle();
        deliveryPage.verifyProductPrice();
        deliveryPage.addProductIntoCart();
        deliveryPage.inCartButton();
        deliveryPage.verifyNumberNearCart();
        deliveryPage.openCartTop();
        deliveryPage.oneProductDisplayed();
        deliveryPage.verifyProductCartTitle();
        deliveryPage.verifyProductCartPrice();
        deliveryPage.toCheckoutPage();
        deliveryPage.checkoutTitle();
        deliveryPage.verifyProductOrderTitle();
        deliveryPage.verifyProductOrderPrice();
        deliveryPage.setAllRequieredFields();
        deliveryPage.goToMakePurchase();
        deliveryPage.onlineCardPayment();
        deliveryPage.halvaCardPayment();
        deliveryPage.offlinePayment();
        deliveryPage.makeOrder();
        deliveryPage.changeOrder();
        deliveryPage.makeCartEmpty();
    });
});
