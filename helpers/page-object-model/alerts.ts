import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/* @Author: Thu Nguyen */
export class Alerts {
      private readonly ctrClickMePrompt: Locator;
      private readonly ctrClickMeConfirm: Locator;
      private readonly ctrConfirmResult: Locator;
      private readonly ctrPromptResult: Locator;

    /** Constructor of the class Alerts
     * @param page fixture Page
    */
      constructor(public readonly page: Page) {
        this.ctrClickMePrompt = this.page.locator("#promtButton");
        this.ctrClickMeConfirm = this.page.locator("#confirmButton");
        this.ctrConfirmResult = this.page.locator("#confirmResult");
        this.ctrPromptResult = this.page.locator("#promptResult");
       
    }

    /** Confirm the confirmation alert 
    * @param action The value of OK or Cancel
    * */
    async confirmAction(action: string){

        await this.interactAlert(this.ctrClickMeConfirm,action);
    }

    /** Confirm the confirmation alert 
    * @param action The value of OK or Cancel
    * */
    async promptAction(action: string, text: string){

        await this.interactAlert(this.ctrClickMePrompt,action,text);
    }

    /** Prompt the alert
    * @param action  The value of OK or Cancel
    * @param text The text to input on the alert
    */
    async interactAlert(locator:Locator,action: string,text?: string){
        
        this.page.on('dialog', async dialog => {
        console.log(dialog.message());
        if (action === "OK")
            if (text == undefined)
                await dialog.accept();
            else                 
                await dialog.accept(text);
        else
            await dialog.dismiss();
        })

        await locator.click();
    }

    /** Check the effect of the confirming action on the confirmation alert
    * @param action The value of OK or Cancel
    */
    async expectConfirmation(action: string){
        if (action === "OK")
            await expect(this.ctrConfirmResult).toHaveText("You selected Ok");
        else
            await expect(this.ctrConfirmResult).toHaveText("You selected Cancel");
    }

    /** Check the effect of the action on the prompt alert 
    * @param action  The value of OK or Cancel
    * @param text The text to input on the alert
    */
    async expectPrompt(action: string,text: string){
        if (action === "OK")
            await expect(this.ctrPromptResult).toHaveText("You entered " + text);
        else
            await expect(await this.ctrPromptResult.count()).toEqual(0);
    }
    
}