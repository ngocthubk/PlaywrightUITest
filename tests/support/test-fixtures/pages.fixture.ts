import { test as base } from '@playwright/test';
import { LoginPage } from '../page-object-model/login-page';
import { BookStore } from '../page-object-model/book-store';

/* @Author: Thu Nguyen */

type PagesFixtures = {
    loginPage: LoginPage;
    bookStore: BookStore;
}
/* Extend the test() of playwright for the PagesFixture */
export const test = base.extend<PagesFixtures>({
    loginPage: async ({page},use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('thu','Th@123456');
        // To wait for logging in successfully  
        await page.getByRole('button',{name: 'Log out'}).hover();
        await use(loginPage);
    },
    bookStore: async ({page},use) => {
        const bookStore = new BookStore(page); 

        await use(bookStore);
        await bookStore.logout();
    }
});

export { expect } from '@playwright/test';