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

  it("should have the holidays creation button", () => {
    cy.get('[data-test="create-holidays-button"]').should(
      "contain",
      "Create new holidays"
    );
  });

  it("should have the holidays list button", () => {
    cy.get('[data-test="holidays-list-button"]').should(
      "contain",
      "Liste des conges"
    );
  });
});

export {};
