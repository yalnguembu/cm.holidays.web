describe("create holiday", () => {
  beforeEach(() => {
    cy.login();
    cy.viewport("macbook-16");
    cy.clock().then((clock) => {
      clock.setSystemTime(new Date("2023-02-12"));
    });
  });

  it("should create the holiday", () => {
    createHoliday();
  });

  it("should create from holiday list", () => {
    cy.visit("/list");
    
    createHoliday();
  });
});

const createHoliday = () => {
  cy.get('[data-test="create-holiday-button"]').click();

  cy.get('[data-test="holiday-type"] select').select(1);
  cy.get('[data-test="starting-date"] input').type("2023-02-15");
  cy.get('[data-test="ending-date"] input').type("2023-02-19");
  cy.get('[data-test="description"] textarea').type("description test");
  cy.get('[data-test="submit-button"]').click();

  cy.assertHolidayListHas(
    0,
    "Wed Feb 15 2023 - Sun Feb 19 2023",
    "01:00",
    "A l'instant",
    "description test",
    "Annual"
  );
};
export {};
