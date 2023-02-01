//Custom Commands
//Differentiate between adding and overwriting commands
//Understand when to use custom commands vs using existing commands

const token = 'abcd1234'

context('Custom Commands', () =>{
  beforeEach(() => {
    cy.visit('/')
  })

  it('sets and gets a token from local storage' , () =>{
    cy.setLocalStorage('token', token)
    cy.getLocalStorage('token').should('eq', token)
  })

  it('overwrites the type command by using sensitve characters', () => {
    cy.visit('/commands/actions')
    cy.findByPlaceholderText('Email').type('email@email.com')
    cy.findByPlaceholderText('Email').type('email@email.com', {sensitive: true})
  })
})