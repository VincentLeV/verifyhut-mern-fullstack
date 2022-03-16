Cypress.Commands.add( "createUser", ({ username, name, password }) => {
    const user = {
        username: username,
        name: name,
        password: password,
    }
    cy.request( "POST", "api/users", user ) 
})

Cypress.Commands.add( "login", ({ username, password }) => {
    cy.request( "POST", "api/login", { username, password }) 
})

Cypress.Commands.add( "saveToken", ({ username, password }) => {
    cy
        .login({ username, password })
        .then(({ body }) => {
            window.localStorage.setItem('auth-token', JSON.stringify(body.token))
        })
})

Cypress.Commands.add( "createCategory", ({ username, password, name }) => {
    cy
        .login({ username, password })
        .then(({ body }) => {
            cy.request({
                method: "POST",
                url: "api/categories",
                headers: {
                    "Content-Type": "application/json",  
                    "Authorization": `Bearer ${body.token}`,       
                },
                body: { name: name }
            })
        })
})

Cypress.Commands.add( "createSignature", ({ 
    username, 
    password, 
    image,
    svg, 
    signer_name,
    reason
}) => {
    cy
        .login({ username, password })
        .then(({ body }) => {
            cy.request({
                method: "POST",
                url: "api/signatures",
                headers: {
                    "Content-Type": "application/json",  
                    "Authorization": `Bearer ${body.token}`,       
                },
                body: {       
                    image,
                    svg,
                    signer_name,
                    reason
                }
            })
        })
})