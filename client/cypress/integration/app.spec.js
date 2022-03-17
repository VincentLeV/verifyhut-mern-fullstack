import { wait } from "@testing-library/user-event/dist/utils"

describe("VerifyHut App", function() {
    before(function() {
        wait(1000)
        cy.request( "POST", "api/testing/reset" )
        wait(1500)
        cy.log("**Create user**")
        cy.createUser({ username: "user", name: "Root User", password: "password" })
        wait(1000)
        // cy.log("**Create Category**")
        // cy.createCategory({ username: "user", password: "password", name: "General" })
        // wait(400)
        // cy.log("**Create Signature**")
        // cy.createSignature({ 
        //     username: "user", 
        //     password: "password",
        //     image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD",
        //     svg: "<svg></svg>",
        //     signer_name: "Vincent Le",
        //     reason: "Buy coffee machine"
        // })
        cy.visit("http://localhost:3000")
        wait(1000)
    })

    it("front page can be opened", function() {
        cy.contains("VerifyHut")
        cy.contains("Login")
        wait(200)
    })

    it("can create user", function() {
        cy.log("**Create User**")
        cy.get("#create-user-link").click()
        cy.get('#signup-form input[name="name"]').type("Vincent Le")
        cy.get('#signup-form input[name="username"]').type("vincentle")
        cy.get('#signup-form input[name="password"]').type("password")
        cy.get("#signup-btn").click()
        wait(500)
        cy.location().should(loc => {
            expect(loc.pathname).to.eq("/")
        })
    })

    it("can login", function() {
        cy.log("**Login**")
        cy.visit("http://localhost:3000")
        cy.get('#login-form input[name="username"]').type("user")
        wait(300)
        cy.get('#login-form input[name="password"]').type("password")
        wait(300)
        cy.get("#login-btn").click()
        wait(1000)
        cy.location().should(loc => {
            expect(loc.pathname).to.eq("/home")
        })
        cy.contains("Sign Here")
        cy.contains("Root User")
        cy.contains("No Category")
        cy.contains("No Uncategorized Signature")
    })

    // describe("Category", function() {
    //     beforeEach(function() {
    //         cy.saveToken({ username: "user", password: "password" })
    //         wait(500)
    //     })

    //     it("can add category", function() {
    //         cy.get("#add-category-btn").click()
    //         cy.get('#add-category-form input[name="name"]').type("Stuff")
    //         wait(300)
    //         cy.get("#add-category-form #add-category-btn").click()
    //         cy.contains("Successfully created category!")

    //         cy.get("#add-category-btn").click()
    //         wait(300)
    //         cy.get('#add-category-form input[name="name"]').type("Misc")
    //         wait(300)
    //         cy.get("#add-category-form #add-category-btn").click()
    //         cy.contains("Successfully created category!")
    //     })
    
    //     it("can edit category", function() {
    //         cy.get("#categories").children().eq(0).click()
    //         wait(300)
    //         cy.get(".edit-category-btn").eq(0).click()
    //         cy.get("#edit-category-form input[name='name']").type("New")
    //         wait(300)
    //         cy.get("#edit-category-form #edit-category-btn").click()
    //         cy.contains("Successfully edited category!")
    //         cy.get("#categories").contains("New")
    //         cy.get("#categories").contains("Misc")
    //     })

    //     it("can delete category", function() {
    //         cy.get("#categories").children().eq(1).click()
    //         cy.get(".delete-category-btn").eq(1).click()
    //         wait(300)
    //         cy.get("#alert-confirm-btn").click()
    //         cy.get("#categories").should('have.length', 1)
    //         cy.contains("Successfully deleted category!")
    //     })
    // })

    // describe("Signature", function() {
    //     beforeEach(function() {
    //         cy.saveToken({ username: "user", password: "password" })
    //         wait(500)
    //     })

    //     it("can create uncategorized signature", function() {
    //         cy.get("#navbar-backdrop").click()
    //         cy.get("#signboard #signboard-save-btn").click()
    //         wait(300)
    //         cy.get("#add-signature-form input[name='signer_name']").type("Vincent Le")
    //         wait(300)
    //         cy.get("#add-signature-form textarea[name='reason']").type("Bought Stuff")
    //         wait(300)
    //         cy.get("#add-signature-btn").click()
    //         wait(300)
    //         cy.contains("Successfully created signature")
    //         cy.get("#hamburger").click()
    //         cy.get("#uncategorized-signatures").should("have.length", 1)
    //     })

    //     it("can create categorized signature", function() {
    //         cy.get("#signboard #signboard-save-btn").click()
    //         wait(300)
    //         cy.get("#add-signature-form input[name='signer_name']").type("Vincent Le")
    //         cy.get("#category-select").click()
    //         cy.get("#option-0").click()
    //         cy.get("#add-signature-form textarea[name='reason']").type("Bought Stuff")
    //         wait(300)
    //         cy.get("#add-signature-btn").click()
    //         wait(300)
    //         cy.contains("Successfully created signature")
            
    //         cy.get("#categories").children().eq(0).click({ force: true })
    //         wait(300)
    //         cy.get(".signature-bar").should("have.length", 2)
    //     })

    //     it("can delete signature", function() {
    //         cy.get(".delete-signature-btn").eq(0).click({ force: true })
    //         cy.get("#alert-confirm-btn").click()
    //         wait(300)
    //         cy.contains("Successfully deleted signature")
    //         wait(300)
    //         cy.get(".signature-bar").should("have.length", 1)
    //     })
    // })
})