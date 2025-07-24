import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/* @Author: Thu Nguyen */
export class Alerts {
      private readonly ctrClickMePrompt: Locator;
      private readonly ctrClickMeConfirm: Locator;
      private readonly ctrConfirmResult: Locator;
      private readonly ctrPromptResult: Locator;

    /** Constructor with one parameter 
     * @param page fixture Page
    */
      constructor(public readonly page: Page) {
        this.ctrClickMePrompt = this.page.locator("#promtButton");
        this.ctrClickMeConfirm = this.page.locator("#confirmButton");
        this.ctrConfirmResult = this.page.locator("#confirmResult");
        this.ctrPromptResult = this.page.locator("#promptResult");
       
    }

    async confirmAction(action: string){

        this.page.on('dialog', async dialog => {
        console.log(dialog.message());
        if (action === "OK")
            await dialog.accept();
        else
            await dialog.dismiss();
        });
        await this.ctrClickMeConfirm.click();
    }

    async promptAction(action: string,text: string){

        
        this.page.on('dialog', async dialog => {
        console.log(dialog.message() + " test dialog ");
        if (action === "OK")
            await dialog.accept(text);
        else
            await dialog.dismiss();
        })

        await this.ctrClickMePrompt.click();
    }

    async expectConfirmation(action: string){
        if (action === "OK")
            await expect(this.ctrConfirmResult).toHaveText("You selected Ok");
        else
            await expect(this.ctrConfirmResult).toHaveText("You selected Cancel");
    }

    async expectPrompt(action: string,text: string){
        if (action === "OK")
            await expect(this.ctrConfirmResult).toHaveText("You entered " + text);
        else
            await expect(await this.ctrConfirmResult.count()).toEqual(0);
    }
    
}