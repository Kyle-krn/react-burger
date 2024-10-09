import 'cypress-drag-drop';

const dropZoneSelector = '[data-cy=constructor-drop-zone]'
const ingredientBunSelector = '[data-cy=ingredient-bun]'
const ingredientItemSelector = '[data-cy=ingredient-item]'
const modalSelector = '[data-cy=modal]'
const createBtnSelector = '#create-order-btn'

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    // Устанавливаем заглушку для API, чтобы использовать фиктивные данные
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUserInfo');
    // cy.wait('@getUserInfo'); // Ожидание загрузки ингредиентов
    cy.visit('/'); // Переход на страницу IngredientsPage
    cy.wait('@getIngredients'); // Ожидание загрузки ингредиентов
  });

  it('should allow dragging ingredients into the constructor', () => {
    // Перетаскивание булки в конструктор
    cy.get(ingredientBunSelector).first().drag(dropZoneSelector)
    
    // // Проверка, что булка добавлена в конструктор
    cy.get(dropZoneSelector).find('[data-cy=bun-top]').should('exist');
    cy.get(dropZoneSelector).find('[data-cy=bun-bottom]').should('exist');
    
    cy.get(ingredientItemSelector).first().drag(dropZoneSelector);
    cy.get(dropZoneSelector).find(ingredientItemSelector).should('exist');
  });

  it('should create an order and display order details', () => {
    // Добавляем ингредиенты в конструктор
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrderError');

    cy.get(ingredientBunSelector).first().drag(dropZoneSelector);
    cy.get(ingredientItemSelector).first().drag(dropZoneSelector);
    
    // Нажимаем кнопку создания заказа
    cy.get(createBtnSelector).click();
    
    // Проверка, что открывается модальное окно с информацией о заказе
    cy.get(modalSelector).should('be.visible');
    cy.get(modalSelector).find('[data-cy="order-id"]').should('exist');
    
    // // Закрытие модального окна
    cy.get('[data-cy=modal-close-btn]').click();
    cy.get(modalSelector).should('not.exist');
  });

  it('should handle error when creating an order fails', () => {
    // Устанавливаем заглушку для имитации ошибки при создании заказа
    cy.intercept('POST', '/api/orders', { statusCode: 500 }).as('createOrderError');
    
    // Добавляем ингредиенты в конструктор
    cy.get(ingredientBunSelector).first().drag(dropZoneSelector);
    cy.get(ingredientItemSelector).first().drag(dropZoneSelector);
    
    // Нажимаем кнопку создания заказа
    cy.get(createBtnSelector).click();
    
    // Ожидание ошибки при создании заказа
    cy.wait('@createOrderError');
    
    // Проверка, что отображается сообщение об ошибке
    cy.get(modalSelector).find('[data-cy="order-error"]').should('exist');
  });
});