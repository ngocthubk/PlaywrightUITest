import { test,expect } from '../helpers/test-fixtures/pages.fixture';


/* @Author: Thu Nguyen */

test.beforeEach(async ({ loginPage }) => {
    test.slow();
    await loginPage.gotoBookStore();
});
test.describe('Search the book store',()=> {
[
        {text: 'git', amount: 1},      
        {text: 'JAVA', amount: 4},
        {text: 'Aachen', amount: 0},
    ].forEach(({text,amount}) => {
test(`Search for ${amount} book(s) containing ${text}`, async ({bookStore,page}) => {
        
        // Input ${text} into the Searchbox
        await bookStore.inputSearch(text);
        // Verify if ${amount} of books containing ${text} are found
        await bookStore.expectSearchResult(text,amount);
    })
})

})