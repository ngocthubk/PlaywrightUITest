import { test, expect, type Page} from '@playwright/test';
import { TextBox } from '../support/page-object-model/text-box';

/* @Author: Thu Nguyen */
test.beforeEach(async ({ page }) => {
    test.slow();
    await page.goto('https://demoqa.com/text-box',{waitUntil: 'load'});
});

test.describe('Input into text boxes',()=> {
    [
        {name: 'Thu1', email: 'thu@gmx.com', curAdd: 'Kohlberger', perAdd: 'Strass'},
        {name: 'Thu2', email: 'ngoc@gmx.com', curAdd: 'Steinweg', perAdd: ''},
        {name: 'Thu3', email: 'ngoc@gmx.com', curAdd: '', perAdd: 'Herzogenrath'},
        {name: 'Thu4', email: '', curAdd: 'Weber', perAdd: 'Aachen'},
    ].forEach(({name, email, curAdd, perAdd}) => {
    test(`Input valid data into text boxes with name: ${name}; email: ${email}; curAdd: ${curAdd}; perAdd ${perAdd}`, async ({page}) => {
        
        let txtBox: TextBox = await new TextBox(page);
        await txtBox.inputTextbox(name, email,curAdd,perAdd);
        // Verify the result
        await txtBox.expectName(name);
        await txtBox.expectEmail(email);
        await txtBox.expectCurrentAddress(curAdd);
        await txtBox.expectPermanentAddress(perAdd);
    })      
})
})