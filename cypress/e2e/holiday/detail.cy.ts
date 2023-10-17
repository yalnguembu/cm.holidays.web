import { holidays } from "../../utils/data";
import { assertHolidayHas } from "../../utils/common";

describe("template spec", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.login();
    window.localStorage.setItem("holidays", JSON.stringify(holidays));
    cy.visit("/list/0");
    cy.clock().then((clock) => {
      clock.setSystemTime(new Date("2023-02-12"));
    });
  });

  it("should have the awaited informations", () => {
    assertHolidayHas(
      "Fri Jan 27 2023 - Tue Jan 31 2023",
      "",
      "Fri Jan 27 2023",
      "Tue Jan 31 2023",
      "Tue Jan 31 2023",
      "I'm sick",
      "Maternite"
    );
  });
});

