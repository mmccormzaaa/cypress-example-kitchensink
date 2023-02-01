//09 - Fixtures in Cypess
//Understand to set up and import fixtures
//write a test that used stubbed data

describe('fixtures', () =>{
  beforeEach(() =>{
    cy.fixture('example').then(function (data){
      this.data = data
      cy.log('THIS: ', this.data)
    })
  })

  it('uses fixture data in a network request', function() {
    cy.visit('/commands/network-requests')
    cy.intercept('GET', '**/comments/*',this.data).as('getComment')
    cy.get('.network-btn').click()
    cy.wait('@getComment').then((res) =>{
      cy.log('RESPONSE: ', res)
    })

  })

  it('pulls data from a fixture', () => {
    cy.fixture('example').then((data) => {
      cy.log('DATA: ', data)
    })
  })

  it('updates fixture data inline', () =>{
    cy.fixture('example').then((data) => {
      data.email = 'updated@email.com'
      cy.log('the email has been updated to :', data)
    })

  })
})