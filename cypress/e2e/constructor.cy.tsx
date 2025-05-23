const selectors = {
  addBlueBunButton: '[data-cy=ingredient-item-one] button[type=button]',
  topBunSelector: `[data-cy=bun-top]`,
  bottomBunSelector: `[data-cy=bun-bottom]`,
  mainIngredientModalSelector: '[data-cy=ingredient-link-four]',
  addMainIngredientButton: '[data-cy=ingredient-item-four] button[type=button]',
  ingredientBeetwen: '[data-cy=between-buns]',
  modalContentSelector: '[data-cy=modal-content]',
  modalCloseButton: '[data-cy=modal-content] button[type=button]',
  modalBackgroundOverlay: '[data-cy=modal-overlay]',
  orderButton: '[data-cy=make-order-button]'
};

describe('Burger Constructor and Order Creation', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', JSON.stringify('1111111111'));
    cy.setCookie('accessToken', JSON.stringify('5555555555'));
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Constructor Functionality', () => {
    it('should add bun and ingredient to constructor', () => {
      cy.wait('@getIngredients');

      // Проверка, что булка отсутствует перед добавлением
      cy.get(selectors.topBunSelector).should('not.exist');
      cy.get(selectors.bottomBunSelector).should('not.exist');

      // Добавление булки
      cy.get(selectors.addBlueBunButton)
        .click()
        .then(() => {
          cy.get(selectors.topBunSelector)
            .contains('Краторная булка N-200i')
            .should('exist');
          cy.get(selectors.bottomBunSelector)
            .contains('Краторная булка N-200i')
            .should('exist');
        });

      // Проверка, что ингредиент отсутствует перед добавлением
      cy.get(selectors.ingredientBeetwen).should('not.exist');
      // Добавление основного ингредиента
      cy.get(selectors.addMainIngredientButton).click();
      // Проверка, что ингредиент появился между булками
      cy.get(selectors.ingredientBeetwen)
        .contains('Соус Spicy-X')
        .should('exist');
    });

    it('should open and close ingredient modal', () => {
      cy.wait('@getIngredients');

      // Проверка, что модальное окно отсутствует перед открытием
      cy.get(selectors.modalContentSelector).should('not.exist');
      //Кликаем по ингредиенту
      cy.get(selectors.addBlueBunButton).click(); //
      // Проверка, что модальное окно открыто
      cy.get(selectors.mainIngredientModalSelector)
        .click()
        .then(() => {
          cy.get(selectors.modalContentSelector).should('exist');
        });
      // Проверка, что в модальном окне содержится нужная информация о ингредиенте
      cy.get(selectors.modalContentSelector)
        .contains('Соус Spicy-X')
        .should('exist'); // Проверка наличия названия

      // Проверка, что в модальном окне содержится информация
      cy.get(selectors.modalContentSelector)
        .contains('Детали ингредиента')
        .should('exist');
      // Закрытие модального окна
      cy.get(selectors.modalCloseButton).click();
      cy.get(selectors.modalContentSelector).should('not.exist');
    });

    it('should close modal on overlay click', () => {
      cy.wait('@getIngredients');

      // Проверка, что модальное окно отсутствует перед открытием
      cy.get(selectors.modalContentSelector).should('not.exist');

      cy.get(selectors.mainIngredientModalSelector)
        .click()
        .then(() => {
          cy.get(selectors.modalContentSelector).should('exist');
        });

      cy.get(selectors.modalBackgroundOverlay).click('top', { force: true });
      cy.get(selectors.modalContentSelector).should('not.exist');
    });
  });

  describe('Order Creation', () => {
    it('should create an order and check order number', () => {
      cy.wait('@getIngredients');

      cy.get(selectors.addBlueBunButton).click();
      cy.get(selectors.addMainIngredientButton).click();
      cy.get(selectors.orderButton).click();

      cy.wait('@postOrder');
      cy.get(selectors.modalContentSelector).contains('11111').should('exist');
    });

    it('should close order modal and check constructor is empty', () => {
      cy.wait('@getIngredients');

      cy.get(selectors.addBlueBunButton).click();
      cy.get(selectors.addMainIngredientButton).click();
      cy.get(selectors.orderButton).click();

      cy.wait('@postOrder');
      cy.get(selectors.modalContentSelector).contains('11111').should('exist');
      cy.get(selectors.modalCloseButton).click();

      // Проверка того, что конструктор пуст
      cy.get(selectors.modalContentSelector).should('not.exist');
      cy.get(selectors.topBunSelector).should('not.exist');
      cy.get(selectors.bottomBunSelector).should('not.exist');
      cy.get(selectors.ingredientBeetwen).should('not.exist');
    });
  });
});
