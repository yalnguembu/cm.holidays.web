import {useCypressCommands} from "@/cypress/utils/common";

const {
    stubGetAllServices,
    stubGetServiceById,
    goToMenu
} = useCypressCommands();
describe("Services list page", () => {
    beforeEach(() => {
        goToMenu('0');
        stubGetAllServices();
        stubGetServiceById();
    });

    it("should have page title", () => {
        cy.get('[data-test="navbar-title"]').should(
            "have.text",
            "Logo"
        );
    });
});

export {};
