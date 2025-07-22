import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/* @Author: Thu Nguyen */
export class LoginPage {

    private readonly ctrUseName;
    private readonly ctrPassword;
    private readonly ctrLogin;
    private readonly ctrUser;
    private readonly ctrBookStore;

    /* Constructor of class LoginPage
    @param page the fixture Page
    */
     constructor(public readonly page: Page) {
        
        this.ctrUseName = this.page.getByPlaceholder('UserName');
        this.ctrPassword = this.page.getByPlaceholder('Password');
        this.ctrLogin = this.page.getByRole('button',{name: 'Login'});
        this.ctrUser = this.page.getByRole('button',{name: 'New User'});
        this.ctrBookStore = this.page.getByRole('button',{name:'Go To Book Store'});
     }

     /* Open the page login */
     async goto(){
        await this.page.goto('https://demoqa.com/login');

     }

     /* Open the page Book Store */
     async gotoBookStore(){
         await  this.ctrBookStore.click();
     }

     /* Login
     @param username Username
     @param password Password
      */
     async login(username: string, password: string){

        await this.ctrUseName.fill(username);
        await this.ctrPassword.fill(password);
        await this.ctrLogin.click();

     }

     

}