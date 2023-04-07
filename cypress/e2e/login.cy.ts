describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should have autehntication navbar", () => {
    cy.get('[data-test="authentication-navbarb-title"]').should(
      "have.text",
      "Logo"
    );
  });

  it("should have the page title", () => {
    cy.get('[data-test="page-title"]').should("have.text", "Login");
  });

  it("should login succesfully", () => {
    cy.get('[data-test="email-field"]').type("user@lao-sarl.cm");
    cy.get('[data-test="password-field"]').type("1234");
    cy.get("button").click();
    cy.url().should("not.contain", "login");
    cy.get("h1").should("have.text", "Hello, welcome...");
  });

  it("should display the error message 'This field is required' when the email field is not filled", () => {
    cy.get("button").click();
    cy.get('[ data-test="email-input-text-error"]').should(
      "contain",
      "This field is required"
    );
  });

  it("should display the error message 'This field is required' when the password field is not filled", () => {
    cy.get("button").click();
    cy.get('[ data-test="password-input-text-error"]').should(
      "contain",
      "This field is required"
    );
  });

  it("should display the error message 'Incorrect email or password' when the email is incorrect", () => {
    cy.get('[data-test="email-field"]').type("user1@lao-sarl.cm");
    cy.get('[data-test="password-field"]').type("1234");
    cy.get("button").click();
    cy.get('[data-test="error-alert"]').should(
      "contain",
      "Incorrect email or password"
    );
  });

  it("should display the error message 'Incorrect email or password' when the password is incorrect", () => {
    cy.get('[data-test="email-field"]').type("user@lao-sarl.cm");
    cy.get('[data-test="password-field"]').type("123");
    cy.get("button").click();
    cy.get('[data-test="error-alert"]').should(
      "contain",
      "Incorrect email or password"
    );
  });
});

export {};
