import type { Page, Locator } from '@playwright/test';
import { expect,test } from '@playwright/test';

/* @Author: Thu Nguyen */
export class TextBox {

      private readonly ctrFullName: Locator;
      private readonly ctrEmail: Locator;
      private readonly ctrCurAdd: Locator;
      private readonly ctrPerAdd: Locator;
      private readonly ctrSubmit: Locator;
      private readonly ctrOutName: Locator;
      private readonly ctrOutEmail: Locator;
      private readonly ctrOutCurAdd: Locator;
      private readonly ctrOutPerAdd: Locator;

    /** Constructor with one parameter 
     * @param page fixture Page
    */
      constructor(public readonly page: Page) {
        this.ctrFullName = this.page.getByPlaceholder("Full Name");
        this.ctrEmail = this.page.getByPlaceholder("name@example.com");
        this.ctrCurAdd = this.page.getByPlaceholder("Current Address");
        this.ctrPerAdd = this.page.locator('#permanentAddress');     
        this.ctrSubmit = this.page.getByRole('button',{name: 'Submit'});
        this.ctrOutName = this.page.locator("xpath=//p[@id='name']");
        this.ctrOutEmail = this.page.locator("xpath=//p[@id='email']");
        this.ctrOutCurAdd = this.page.locator("xpath=//p[@id='currentAddress']");
        this.ctrOutPerAdd = this.page.locator("xpath=//p[@id='permanentAddress']");
    }

    /** Input into the text box Full Name 
     * @param name  The full name
    */
    async inputFullName(name: string){
        await this.ctrFullName.fill(name);
    }

    /** Input into the text box Email 
    @param email The email
    */
    async inputEmail(email: string){
        await this.ctrEmail.fill(email);
    }

    /** Input into the text box Current Address
    @param curAdd The current address of the user
    */
    async inputCurrentAddress(curAdd: string){
        await this.ctrCurAdd.fill(curAdd);
    }

    /** Input into the text box Permanent Address
    @param perAdd The permanent address of the user
    */
    async inputPermanentAddress(perAdd: string){
        await this.ctrPerAdd.fill(perAdd);
    }

    /** Click on the button Submit */
    async clickSubmit(){
        await this.ctrSubmit.click();
    }

    /** Input into the text boxes
    @param name The full name of the user
    @param email The email of the user
    @param curAdd The current address of the user
    @param perAdd The permanent address of the user */
    async inputTextbox(name: string, email: string, curAdd: string, perAdd: string){
        await test.step('Input data into the text boxes', async()=>{
            await this.inputFullName(name);
            await this.inputEmail(email);
            await this.inputCurrentAddress(curAdd);
            await this.inputPermanentAddress(perAdd);
        })
        await test.step('Click on the button Submit', async()=>{ 
            await this.ctrSubmit.click();
        })
        
    }

    /** Check if the name is saved and shown correctly
    @param name The name of the user */
    async expectName(name: string){
        if (name.length > 0)
            await expect(this.ctrOutName).toHaveText("Name:" + name);         
        else
            console.log("The Name is empty");
    }

    /** Check if the email is saved and shown correctly 
    @param email The email of the user*/
    async expectEmail(email: string){  
        if (email.length > 0)
            await expect(this.ctrOutEmail).toHaveText("Email:" + email);
        else
            console.log("The Email is empty");
    }

    /** Check if the current address is saved and shown correctly
    @param curAdd The current address of the user */
    async expectCurrentAddress(curAdd: string){   
        if  (curAdd.length > 0) 
            await expect(this.ctrOutCurAdd).toHaveText("Current Address :" + curAdd);
        else
            console.log("The Current Address is empty");
    }

    /** Check if the permanent address is saved and shown correctly
    @param perAdd The permanent address of the user */
    async expectPermanentAddress(perAdd: string){
        if (perAdd.length > 0)   
            await expect(this.ctrOutPerAdd).toHaveText("Permananet Address :"+ perAdd);
        else
            console.log("The Permanent Address is empty");
    }
}