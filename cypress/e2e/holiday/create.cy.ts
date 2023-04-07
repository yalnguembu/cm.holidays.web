describe("create holiday", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-test="create-holiday-button"]').click();
    cy.viewport("macbook-16");
    cy.clock().then((clock) => {
      clock.setSystemTime(new Date("2023-02-12"));
    });
  });

  it("should have the holiday form title", () => {
    cy.get('[data-test="form-title"]').should("contain", "Create a holiday");
  });

  it("should be accessible from list", () => {
    cy.visit("/list");
    cy.get('[data-test="create-holiday-button"]').click();
    cy.get('[data-test="form-title"]').should("contain", "Create a holiday");
  });

  it("should create the holiday", () => {
    cy.get('[data-test="holiday-type"] select').select(1);
    cy.get('[data-test="starting-date"] input').type("2023-02-15");
    cy.get('[data-test="ending-date"] input').type("2023-02-19");
    cy.get('[data-test="description"] textarea').type("description test");

    cy.get('[data-test="submit-button"]').click();
    cy.url().should("contain", "list");

    cy.assertHolidayListHas(
      0,
      "Wed Feb 15 2023 - Sun Feb 19 2023",
      "01:00",
      "A l'instant",
      "description test",
      "Annual"
    );
  });

  it("should calculate the number od days", () => {
    cy.get('[data-test="starting-date"] input').type("2023-03-01");
    cy.get('[data-test="ending-date"] input').type("2023-03-14");

    cy.get('[data-test="number-of-days"] input')
      .invoke("val")
      .then((value) => {
        expect(value).to.equal("13");
      });
  });

  it("should calculate the returning date", () => {
    cy.get('[data-test="starting-date"] input').type("2023-03-01");
    cy.get('[data-test="ending-date"] input').type("2023-03-14");

    cy.get('[data-test="returning-date"] input')
      .invoke("val")
      .then((value) => {
        expect(value).to.equal("2023-03-14");
      });
  });

  it("should set the returning date the next working date when it fall a non working day", () => {
    cy.get('[data-test="starting-date"] input').type("2023-03-01");
    cy.get('[data-test="ending-date"] input').type("2023-03-11");

    cy.get('[data-test="returning-date"] input')
      .invoke("val")
      .then((value) => {
        expect(value).to.equal("2023-03-13");
      });

    cy.get('[data-test="starting-date"] input').type("2023-03-01");
    cy.get('[data-test="ending-date"] input').type("2023-03-19");

    cy.get('[data-test="returning-date"] input')
      .invoke("val")
      .then((value) => {
        expect(value).to.equal("2023-03-20");
      });
  });

  describe("falling cases", () => {
    it("should show errors messages when all fields are empty", () => {
      cy.get('[data-test="submit-button"]').click();

      cy.get('[data-test="select-input-text-error"]').should(
        "have.text",
        "This field is required"
      );
      cy.get('[data-test="date-input-text-error"]')
        .eq(0)
        .should("have.text", "This field is required");
      cy.get('[data-test="date-input-text-error"]')
        .eq(1)
        .should("have.text", "This field is required");
      cy.get('[data-test="textarea-input-text-error"]').should(
        "have.text",
        "This field is required"
      );
    });

    it("should show error message when all input are correctly filled except the type", () => {
      cy.get('[data-test="starting-date"] input').type("2023-02-15");
      cy.get('[data-test="ending-date"] input').type("2023-02-19");
      cy.get('[data-test="description"] textarea').type("description test");

      cy.get('[data-test="submit-button"]').click();

      cy.get('[data-test="select-input-text-error"]').should(
        "have.text",
        "This field is required"
      );
    });

    it("should show error message when all input are correctly filled except the starting date", () => {
      cy.get('[data-test="holiday-type"] select').select(1);
      cy.get('[data-test="ending-date"] input').type("2023-02-19");
      cy.get('[data-test="description"] textarea').type("description test");

      cy.get('[data-test="submit-button"]').click();
      cy.get('[data-test="starting-date"]').within(() => {
        cy.get('[data-test="date-input-text-error"]').should(
          "have.text",
          "This field is required"
        );
      });
    });

    it("should show error message when all input are correctly filled except the ending date", () => {
      cy.get('[data-test="holiday-type"] select').select(1);
      cy.get('[data-test="starting-date"] input').type("2023-02-19");
      cy.get('[data-test="description"] textarea').type("description test");

      cy.get('[data-test="submit-button"]').click();
      cy.get('[data-test="ending-date"]').within(() => {
        cy.get('[data-test="date-input-text-error"]').should(
          "have.text",
          "This field is required"
        );
      });
    });

    it("should shows errors message when all input are correctly filled except the ending date", () => {
      cy.get('[data-test="holiday-type"] select').select(1);
      cy.get('[data-test="starting-date"] input').type("2023-02-19");
      cy.get('[data-test="ending-date"] input').type("2023-02-23");

      cy.get('[data-test="submit-button"]').click();
      cy.get('[data-test="description"]').within(() => {
        cy.get('[data-test="textarea-input-text-error"]').should(
          "have.text",
          "This field is required"
        );
      });
    });

    it("should show error message when starting date is before tomorrow", () => {
      cy.get('[data-test="starting-date"] input').type("2023-02-01");

      cy.get('[data-test="starting-date"]').within(() => {
        cy.get('[data-test="date-input-text-error"]').should(
          "have.text",
          "It must be after today"
        );
      });
    });

    it("should show error message when ending date is after starting date", () => {
      cy.get('[data-test="starting-date"] input').type("2023-02-23");
      cy.get('[data-test="ending-date"] input').type("2023-02-19");

      cy.get('[data-test="ending-date"]').within(() => {
        cy.get('[data-test="date-input-text-error"]').should(
          "have.text",
          "It must be after starting date"
        );
      });
    });
  });
});

export {};
