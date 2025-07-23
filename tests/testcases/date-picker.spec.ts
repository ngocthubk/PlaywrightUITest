import { test, expect, type Page} from '@playwright/test';
import { DatePicker } from '../support/page-object-model/date-picker';

/* @Author: Thu Nguyen */
test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/date-picker',{waitUntil: 'load'});

});

test.describe('Input Date',()=> {
    [
        {date: "07/21/2025"},  
        {date: "06/30/2025"},
        {date: "07/01/2025"},
        {date: "02/29/2024"},        
    ].forEach(({date}) => {
    test(`Select date: ${date}`, async ({page}) => {
        
        let datePicker: DatePicker = await new DatePicker(page);
        await datePicker.selectDate(date);
        // Verify if the date value is filled in the Select Date box
        await datePicker.expectDate(date);
    })      
})
})