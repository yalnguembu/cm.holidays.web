/// <reference types="cypress" />

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('[data-test="email-field"] input').type("user@lao-sarl.cm");
  cy.get('[data-test="password-field"] input').type("1234");
  cy.get("button").click();
  cy.url().should("not.contain", "login");
});

