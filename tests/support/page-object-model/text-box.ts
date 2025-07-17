import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

// Author: Thu Nguyen
export class TextBox {

      private readonly fullName: Locator;
      private readonly email: Locator;
      private readonly curAdd: Locator;
      private readonly perAdd: Locator;
      private readonly submit: Locator;
      private readonly outName: Locator;
      private readonly outEmail: Locator;
      private readonly outCurAdd: Locator;
      private readonly outPerAdd: Locator;

    /** Constructor with one parameter 
     * @param page fixture Page
    */
      constructor(public readonly page: Page) {
        this.fullName = this.page.getByPlaceholder("Full Name");
        this.email = this.page.getByPlaceholder("name@example.com");
        this.curAdd = this.page.getByPlaceholder("Current Address");
        this.perAdd = this.page.locator('#permanentAddress');     
        this.submit = this.page.getByRole('button',{name: 'Submit'});
        this.outName = this.page.locator("xpath=//p[@id='name']");
        this.outEmail = this.page.locator("xpath=//p[@id='email']");
        this.outCurAdd = this.page.locator("xpath=//p[@id='currentAddress']");
        this.outPerAdd = this.page.locator("xpath=//p[@id='permanentAddress']");
    }

    /** Input into the text box Full Name 
     * @param name  The full name
    */
    async inputFullName(name: string){
        await this.fullName.fill(name);
    }

    /* Input into the text box Email 
    @param email The email
    */
    async inputEmail(email: string){
        await this.email.fill(email);
    }

    /* Input into the text box Current Address
    @param curAdd The current address of the user
    */
    async inputCurrentAddress(curAdd: string){
        await this.curAdd.fill(curAdd);
    }

    /* Input into the text box Permanent Address
    @param perAdd The permanent address of the user
    */
    async inputPermanentAddress(perAdd: string){
        await this.perAdd.fill(perAdd);
    }

    /* Click on the button Submit */
    async clickSubmit(){
        await this.submit.click();
    }

    /* Input into the text boxes
    @param name The full name of the user
    @param email The email of the user
    @param curAdd The current address of the user
    @param perAdd The permanent address of the user */
    async inputTextbox(name: string, email: string, curAdd: string, perAdd: string){
        await this.inputFullName(name);
        await this.inputEmail(email);
        await this.inputCurrentAddress(curAdd);
        await this.inputPermanentAddress(perAdd);
        await this.submit.click();
        
    }

    /* Check if the name is saved and shown correctly
    @param name The name of the user */
    async expectName(name: string){
        if (name.length > 0)
            await expect(this.outName).toHaveText("Name:" + name);         
        else
            console.log("The Name is empty");
    }

    /* Check if the email is saved and shown correctly 
    @param email The email of the user*/
    async expectEmail(email: string){  
        if (email.length > 0)
            await expect(this.outEmail).toHaveText("Email:" + email);
        else
            console.log("The Email is empty");
    }

    /* Check if the current address is saved and shown correctly
    @param curAdd The current address of the user */
    async expectCurrentAddress(curAdd: string){   
        if  (curAdd.length > 0) 
            await expect(this.outCurAdd).toHaveText("Current Address :" + curAdd);
        else
            console.log("The Current Address is empty");
    }

    /* Check if the permanent address is saved and shown correctly
    @param perAdd The permanent address of the user */
    async expectPermanentAddress(perAdd: string){
        if (perAdd.length > 0)   
            await expect(this.outPerAdd).toHaveText("Permananet Address :"+ perAdd);
        else
            console.log("The Permanent Address is empty");
    }
}