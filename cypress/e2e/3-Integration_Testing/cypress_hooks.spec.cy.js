//CYPRESS HOOKS
//14th Test
//before : runs one time before all tests start
//beforeEach : runs one time after all tests are finished
//after : runs one time after all the tests are finsihed
//aftrEach : runs after each individual test

    describe('Cypress Hooks', () => {
      before(() =>{
          cy.request('https://api.spacexdata.com/v3/missions').its('body').should('have.length', 10)
      })
      //before / beforeAll is run at the beginning of the test run
      beforeEach(() =>{ 
          cy.visit('/')
      })
      // beforeEach is run before each of the tests
      afterEach(() =>{
          cy.log('after each hook is logged here')
      })
      //afterEach each is run after each of the tests have been executed
      after(() => {
          cy.log('the final after hook runs once.')
      })
      //after runs after all the the tests have been executed
      //1st Test
      it('renders the correct h1 text', () =>{
          cy.get('h1').should('contain.text', 'Kitchen Sink')
      })
      //2nd Test
      it('contains a h1', () =>{
          cy.get('h1').should('exist')
      })
    })