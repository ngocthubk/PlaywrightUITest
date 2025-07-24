import { test, expect, type Page} from '@playwright/test';
import { Alerts } from '../support/page-object-model/alerts';

/* @Author: Thu Nguyen */
test.beforeEach(async ({ page }) => {
    test.slow();
    await page.goto('https://demoqa.com/alerts',{waitUntil: 'domcontentloaded'});

});

test.describe('Interact with alerts',()=> {
    [
        {action: "OK"},
        {action: "Cancel"},        
    ].forEach(({action}) => {
    test(`Confirm the alert: ${action}`, async ({page}) => {
        
        let alert: Alerts = await new Alerts(page);
        await alert.confirmAction(action);
        // Verify if confirm action takes effect
        await alert.expectConfirmation(action);
    })      
});

  [
        {action: "OK", text: "Hello"},
        {action: "Cancel", text: ""},        
    ].forEach(({action,text}) => {
    test(`Input ${text} into the prompt alert then click ${action}`, async ({page}) => {
        
        let alert: Alerts = await new Alerts(page);
        await alert.promptAction(action,text);
        // Verify if prompt action takes effect
        await alert.expectPrompt(action,text);
    })      
})
})