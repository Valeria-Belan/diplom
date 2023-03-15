import 'cypress-xpath';

class ArticlePage {
    // Локаторы
    private openFirstAutoPageArticleLocator = '(//div//h3)[7]'; //'(//section/article/h2)[3]'; //Открыть первую статью в категории "Авто" - есть статьи, где нельзя ставить реакцию
    private articlePageTitleLocator = '(//div/h1)[1]'; //Страница статьи открыта
    private countValueLocator = "(//span[@class='st-count'])[2]"; //Проверить количество кликов до реакции
    private reactionOnArtilceLocator = "//div[@data-reaction='heart_eyes']"; //Нажать на иконку реакции
    private reactionSelectedLocator = "//div[@class='st-btn st-selected']"; //убедиться, что кликнули на нее
    private clickDisabledIconLocator = "//div[contains(@class, 'st-btn') and not(contains(@class, 'selected'))]"; //Остальные иконки перестали быть активными
    private secondClickOnActiveIconLocator = "//div[contains(@class, 'st-selected')]//span[@class='st-count ']";  //Проверить количество кликов после повторного клика на реакцию

    // Веб-элементы
    private get openFirstAutoPageArticle() {
        return cy.xpath(this.openFirstAutoPageArticleLocator);
    }
    private get articlePageTitle() {
        return cy.xpath(this.articlePageTitleLocator);
    }
    private get countValue() {
        return cy.xpath(this.countValueLocator);
    }
    private get reactionOnArtilce() {
        return cy.xpath(this.reactionOnArtilceLocator);
    }
    private get reactionSelected() {
        return cy.xpath(this.reactionSelectedLocator);
    }
    private get clickDisabledIcon() {
        return cy.xpath(this.clickDisabledIconLocator);
    }
    private get secondClickOnActiveIcon() {
        return cy.xpath(this.secondClickOnActiveIconLocator);
    }

    // Методы взаимодействия с ними
    firstAutoPageArticle() {
        this.openFirstAutoPageArticle.click();
    }
    verifyArticlePageTitle() {
        this.articlePageTitle.should('be.visible');
    }
    checkCountBeforeAndAfterReaction() {
        cy.get('span.st-count')
            .eq(1)
            .then(($clicks) => {
                const clicksBefore = parseInt($clicks.text());
                this.countValue.should('have.text', clicksBefore);

                this.reactionOnArtilce.click();

                cy.get('span.st-count')
                    .eq(1)
                    .should(($clicks) => {
                        const clicksAfter = parseInt($clicks.text());
                        expect(clicksAfter).to.equal(clicksBefore + 1);
                    });
            });
    }
    verifyReactioSelected() {
        this.reactionSelected.should('be.visible');
    }
    clickOnDisabledIcon() {
        this.clickDisabledIcon.should('have.length', 4);
    }
    secondClickOnSelectedIcon() { //Нажать на икноку повторно. Оценка не снялась, кол-во оценок осталось прежним
        this.reactionOnArtilce.click();
        cy.get('span.st-count')
            .eq(1)
            .then(($clicks) => {
                const clickAgain = parseInt($clicks.text());
                this.secondClickOnActiveIcon.should('have.text', clickAgain);
            });
    }
}

export const articlePage = new ArticlePage();