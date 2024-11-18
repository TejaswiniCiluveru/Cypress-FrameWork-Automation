beforeEach(function () {
    cy.fixture('searchData').then(function (data) {
        this.data = data;
    });
    cy.fixture('tutorial').then(function (itemdata) {
        this.itemdata = itemdata;
    });
});
