describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', '1111111111');
    localStorage.setItem('refreshToken', '5555555555');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'fetchUser'
    );

    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Загрузка ингредиентов при открытии страницы', () => {
    cy.wait('@getIngredients');
    cy.contains('Выберите булки').should('exist'); // Проверка наличия заголовка
    cy.get('[data-testid="category-buns"]').should('exist'); // Проверка наличия булок
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.wait('@getIngredients');
    // Добавление булки
    cy.get('[data-testid="tab-bun"]').click();
    cy.get('[data-testid="category-buns"]')
      .find('button')
      .contains('Добавить')
      .first()
      .click();
    cy.get('.burger-constructor')
      .contains('Краторная булка N-200i')
      .should('exist');

    // Добавление начинки
    cy.get('[data-testid="tab-main"]').click();
    cy.get('[data-testid="category-mains"]')
      .find('button')
      .contains('Добавить')
      .first()
      .click();
    cy.get('.burger-constructor')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    // Добавление соуса
    cy.get('[data-testid="tab-sauce"]').click();
    cy.get('[data-testid="category-sauces"]')
      .find('button')
      .contains('Добавить')
      .first()
      .click();
    cy.get('.burger-constructor').contains('Соус Spicy-X').should('exist');
  });

  it('должен открывать модальное окно ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get('[data-testid="category-buns"]').first().click(); // Открытие модального окна
    cy.get('[id=modals]').should('be.visible'); // Проверка, что модал открылся

    cy.get('[id=modals]').find('button').click().should('not.exist'); // Закрытие модального окна
    cy.get('[id=modals]').should('not.exist'); // Проверка, что модал открылся
  });

  it('успешно создать заказ и очистить конструктор', () => {
    // Ждем загрузки данных пользователя
    cy.wait('@fetchUser');
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
    // Добавляем ингредиенты
    cy.get('[data-testid="category-buns"]')
      .should('exist')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="category-mains"]').contains('Добавить').click();
    cy.get('[data-testid="category-sauces"]').contains('Добавить').click();
    // Нажимаем кнопку "Оформить заказ"
    cy.get('[type=button]').contains('Оформить заказ').click();

    // Ожидание успешного ответа от сервера
    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

    // Проверяем что модальное окно с номером заказа открыто
    cy.get('[id=modals]').contains('11111').should('be.visible');
    // Закрываем модалку
    cy.get('[id=modals]').find('button').click().should('not.exist');

    // Проверяем, что конструктор очищен после создания заказа
    // cy.get('.constructor-element_pos_top').should('not.exist');
    // cy.get('.constructor-element').should('not.exist');
    cy.get('.burger-constructor').find('.ingredient').should('have.length', 0);
  });
});
