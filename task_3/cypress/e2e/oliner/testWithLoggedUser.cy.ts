import { logIn } from '../../fixtures/loginHelper';
import { articlePage } from '../../pages/articlePage';

describe('Onliner diplom tests', () => {
    beforeEach(() => {
        cy.visit('https://www.onliner.by/');
        logIn();
    });
    it('1_5 - Article page //Пользователь может поставить оценку статье (Precondition: выполнен вход в аккаунт)', () => {
        articlePage.firstAutoPageArticle();
        articlePage.verifyArticlePageTitle();
        articlePage.checkCountBeforeAndAfterReaction();
        articlePage.verifyReactioSelected();
        articlePage.clickOnDisabledIcon();
        articlePage.secondClickOnSelectedIcon();
    });
});
