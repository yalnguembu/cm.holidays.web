describe("home page", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should have page title", () => {
    cy.get('[data-test="navbar-title"]').should(
      "have.text",
      "Logo"
    );
  });

  it("should have the welcome message", () => {
    cy.get("h1").should("have.text", "Hello, welcome...");
  });

  it("should have the holiday creation button", () => {
    cy.get('[data-test="create-holiday-button"]').should(
      "contain",
      "Create new holiday"
    );
  });

  it("should have the holiday list button", () => {
    cy.get('[data-test="holiday-list-button"]').should(
      "contain",
      "Liste des conges"
    );
  });
});

export {};
