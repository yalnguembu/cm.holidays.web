import { holidays } from "../../utils/data";

describe("template spec", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-test="holiday-list-button"]').click();
    cy.viewport("macbook-16");
    cy.clock().then((clock) => {
      clock.setSystemTime(new Date("2023-02-12"));
    });
  });

  it("should have the awaited design when the holiday list is empty", () => {
    cy.get("img").should("exist");
    cy.get("p").should("have.text", "No holiday has been created");
  });

  it("should contain holidays", () => {
    window.localStorage.setItem("holidays", JSON.stringify(holidays));
    cy.get('[data-test="holiday-item"]').should("have.length", 2);

    cy.assertHolidayListHas(
      0,
      "Fri Jan 27 2023 - Tue Jan 31 2023",
      "09:29",
      "il y'a 17 jours",
      "I'm sick",
      "Maternite"
    );

    cy.assertHolidayListHas(
      1,
      "Mon Jun 12 2023 - Sat Jul 01 2023",
      "17:00",
      "il y'a 16 jours",
      "I will travel for skill leveling",
      "Annual"
    );
  });
});

export {};
