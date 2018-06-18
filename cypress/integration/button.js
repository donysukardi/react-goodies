describe('Button', () => {
  before(() => {
    cy.visitStory('Button', 'with text')
  })

  it('Button contains Hello Button', () => {
    cy.getInStoryByTestId('buttonWithText').should('contain', 'Hello Button')
  })
})
