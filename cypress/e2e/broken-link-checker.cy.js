describe('Broken Link Checker (First 20 Links)', () => {
  it('checks for broken links on a page', () => {
    cy.visit('https://www.financialexpress.com'); // Change if needed

    cy.get('a').each((link, index) => {
      if (index < 20) { // Only check first 20 links
        const href = link.prop('href');
        if (href && !href.startsWith('mailto')) {
          cy.request({
            url: href,
            failOnStatusCode: false,
            timeout: 5000 // 5 seconds per request
          }).then(response => {
            if (response.status >= 400) {
              cy.log(`Broken link: ${href} [${response.status}]`);
            }
          });
        }
      }
    });
  });
});
