const navBarText = Cypress.env('navBarText'); // storing the env variable as a const to be used throughout tests (within config file)
const testdescription = Cypress.env('testdescription');
describe('my first test', () => {
    // beforeEach command is used at the beginning to execute before each test, for this instance the URL will open for each test
    beforeEach(() => {
        cy.visit('/commands/actions') // stored the baseURL in the cypress config file. 
      })

      //First test to show how cy.get works
      it('has a h1 on the page', () => {
        cy.get('h1').should('exist');
      })

      //2nd Test to find text 
      it('renders the correct h1 text', () => {
        cy.get('h1').should('contain.text', 'Actions')
      })  

      //UNDERSTANDING FIND AND GET COMMANDS
      //3rd test to find an element, and narrow it down to the first one.
      it('renders a paragraph under the h1', () => {
        cy.get('.container').eq(1).find('p').should('exist') 
        //note : how eq works is similar to array - starts at 0 , for 1, and 1 for 2 etc....
      })

      //4th test to show the within command within an element - and the test focuses on that.
      it('renders a section with the correct elements', () => {
        cy.get('.container').eq(2).within(() =>{
            cy.get('h4').should('exist');
            cy.get('p').should('exist');
        })
      })

      //INSTALLING PLUGINS SECTION OF THE COURSE
      //5th test to show the plugins installed, using findByText for example to find a text on the page without specfic location.
      it('correct renders the cypress website link', () => {
        cy.findByText(navBarText).should('exist') // declaring the const variable created from the env variable.
      })

      //HANDLING CYPRESS ASYNC COMMANDS
      //6th test - finding an email element and inserting some text
      it('finding email element and inserting text using findByPlaceholderText', () => {
        cy.visit('/commands/actions')
        cy.findByPlaceholderText('Email').should('exist'); //leveraging React Plugin to use different commands
        cy.findByPlaceholderText('Email').type('email@email.com')
        cy.wait(500) // wait 5 seconds
        console.log('Test is finished'); // outputting text at end of test
        cy.log('Console Cypress Log') //prints to the cypress test window.
      })

      //NON-CYPRESS ASYNC PROMISES
      //7th test - 
      it('Non-Cypress Async Promises', () => {
        cy.visit('/commands/actions')
        cy.findByPlaceholderText('Email').type('email@email.com')
        cy.wait(500).then(() =>{ //adding the .then function will wait until all Cypress code is complete before executing non-cypress commands
          console.log('test is finished after cypress commands are complete.') // prints to the console after cypress commands complete
          fetch('https://api.spacexdata.com/v3/missions') //fetch is used to return information from API for eg.
          .then((res) => res.json()) // .then is used to declare the response in a variable , and then stored in a json format
          .then((data) => { // data is returned and stored in the data variable
            console.log('the following is the data returned from the API call', data) // prints the data returned to the console.
          }) 
        }) 
      })

      //ASSERTIONS IN CYPRESS
      //8TH TEST - positive assertion test.
      it('shows an active class for the page', () =>{
        cy.visit('/commands/actions')
        cy.get('.dropdown-menu').find('li').eq(2).should('have.class', 'active') 
        //using the .get command to find the .dropdown-menu class(need to add a . at the beginning as its a class)
        //.find to find the list within the class
        //.eq to navigate to the 3rd item on the list
        //.should to find the class with the active status within it
      })

      //9th test -- negative assertion test
      it('should not have an active class on inactive pages' ,() => {
        cy.visit('/commands/actions')
        cy.get('.dropdown-menu') //getting the class of .dropdown-menu
        .find('li') //finding the list attribute
        .first() //finding the first item within the list , should also be able to use .eq(0)
        .should('not.have.class', 'active') //determining that the class is not active
        .find('a') //finding the the a attirbute within the same line referenced above
        .should('have.attr', 'href', '/commands/querying') // determinding that the line does have the correct attributes
      })

      //UI COMMANDS
      //10TH TEST
      it('links to the actions page correctly', () =>{
        cy.visit('/') //visiting the BaseURL stored in the env file.
        // cy.findAllByText('Commands').first().click()
        cy.findAllByText('Actions').first().click({force:true}) //by adding the force true, we are forcing the test to click the first 'Actions' Element even though it is not present on the screen.
        cy.url().should('include', 'commands/actions') // checking that a URL contains a specific path.
      })

      //11th Test
      it('lets you type in an input field', () => {
        cy.visit('/commands/actions')
        cy.findByPlaceholderText('Email').type('test').should('have.value', 'test')
      }) 

      //12th Test
      it('lets you clear an input field', () => {
         cy.visit('/commands/actions')
         cy.findByLabelText('Describe:').type(testdescription).should('have.value', testdescription).clear().should('have.value', '')
         //comment for above - Using variables to input and verify an input box, and then the .clear function to remove the entered text
      })

      //13th test
      it('gets you check a checkbox', () => {
        cy.visit('/commands/actions')
        cy.get('.action-checkboxes [type="checkbox"]').first().check().should('be.checked')
        cy.get('.action-checkboxes [type="checkbox"]').eq(1).check({force:true}).should('be.checked')
      })
});
