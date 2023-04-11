export const assertHolidayListHas = (
  id: number,
  dateRange: string,
  creationTime: string,
  createdSince: string,
  description: string,
  type: string
) => {
  cy.get('[data-test="holiday-item"]')
    .eq(id)
    .within(() => {
      cy.get('[data-test="created-at"]').should("contain", createdSince);
      cy.get('[data-test="creation-time"]').should("contain", creationTime);
      cy.get('[data-test="date-range"]').should("contain", dateRange);
      cy.get('[data-test="description"]').should("contain", description);
      cy.get('[data-test="type"]').should("contain", type);
    });
};

export const assertHolidayHas = (
  dateRange: string,
  numberOfDays: string,
  startingDate: string,
  endingDate: string,
  returningDate: string,
  description: string,
  type: string
) => {
  cy.get('[data-test="starting-date"]').should("contain", startingDate);
  cy.get('[data-test="ending-date"]').should("contain", endingDate);
  cy.get('[data-test="returning-date"]').should("contain", returningDate);
  cy.get('[data-test="holiday-description"]').should("contain", description);
  cy.get('[data-test="holiday-type"]').should("contain", type);
};
