/// <reference types="cypress" />
import { services, posts } from "./data"
export function useCypressCommands() {
    cy.viewport(1920, 1080);

    const login = (username: string, password: string) => {
        cy.visit("/");
        cy.get("#username").type(username).get("#password").type(password);
        cy.get("#kc-login").click();
        localStorage.setItem("firstLoggin", "true");
    };
    interface Service{
        id: string,
        name: string,
        posts: Post[],
        description: string,
        isActive: boolean,
        createdAt: string
    }

    interface Post{
        id: string,
        name: string,
        service: Service,
        description: string,
        isActive: boolean,
        createdAt: string
    }

    const goToMenu = (item:string)=>{
        cy.get('[data-test="nav-bar"]').within(()=>{
            cy.get(`[data-test="nav-${item}"]`)
        });
    }

    const stubGetAllServices = (services:Service[] = services) =>{
        cy.intercept({
            method: "GET",
            url: "/services",
        }, {
            statusCode: 200,
            body: services,
        }).as("business-clients");
    }
    const stubGetServiceById = (service:Service = services[0]) =>{
        cy.intercept({
            method: "GET",
            url: `/services/${service.id}`,
        }, {
            statusCode: 200,
            body: service,
        }).as("business-clients");
    }
    const stubGetAllPosts = (posts:Post[] = posts) =>{
        cy.intercept({
            method: "GET",
            url: "/services",
        }, {
            statusCode: 200,
            body: posts,
        }).as("business-clients");
    }

    const stubGetPostById = (post:Post = posts[0]) =>{
        cy.intercept({
            method: "GET",
            url: `/services/${post.id}`,
        }, {
            statusCode: 200,
            body: post,
        }).as("business-clients");
    }

    return {
        login,
        stubGetAllServices,
        stubGetServiceById,
        goToMenu,
        stubGetAllPosts,
        stubGetPostById,
    }
}
