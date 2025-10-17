/// <reference types="cypress" />

describe('Login básico', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('marca email inválido', () => {
    cy.get('[data-testid="email-input"]').clear().type('no-es-email')
    cy.get('[data-testid="password-input"]').clear().type('algo')
    cy.get('[data-testid="submit-button"]').click()

    cy.get('[data-testid="email-error"]')
      .should('be.visible')
      .and('contain.text', 'email')
  })

  it('muestra error con credenciales inválidas (401)', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('login401')

    cy.fixture('users').then(({ invalid }) => {
      cy.get('[data-testid="email-input"]').clear().type(invalid.email)
      cy.get('[data-testid="password-input"]').clear().type(invalid.password)
    })

    cy.get('[data-testid="submit-button"]').click()
    cy.wait('@login401')

    cy.get('[data-testid="error-text"]')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials')
    cy.url().should('include', '/login')
  })

  it('ver/ocultar contraseña cambia el type', () => {
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password')
    cy.get('[data-testid="password-toggle"]').click()
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'text')
    cy.get('[data-testid="password-toggle"]').click()
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password')
  })

  it('login exitoso con credenciales válidas (sin redirección)', () => {
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: { token: 'jwt.token.123', user: { name: 'Andrea' } },
  }).as('login200')

  cy.fixture('users').then(({ valid }) => {
    cy.get('[data-testid="email-input"]').clear().type(valid.email)
    cy.get('[data-testid="password-input"]').clear().type(valid.password)
  })

  cy.get('[data-testid="submit-button"]').click()
  cy.wait('@login200')

  cy.get('[data-testid="success-text"]')
    .should('be.visible')
    .and('contain.text', 'Login successful')

  cy.window().then((win) => {
    const token = win.localStorage.getItem('token')
    expect(token).to.eq('jwt.token.123')
  })
})

})
