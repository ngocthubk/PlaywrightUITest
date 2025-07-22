import { test, expect, type Page} from '@playwright/test';
import { Slider } from '../support/page-object-model/slider';

/* @Author: Thu Nguyen */
test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/slider');
});

test.describe('Drag the slider',()=> {
    [
        {value: 20},
        {value: 0},
        {value: 100},
    ].forEach(({value}) => {
    test(`Drag the slider to: ${value}`, async ({page}) => {
        
        let slider: Slider = await new Slider(page);
        await slider.dragSlider(value);
        // Verify if the output show ${value}
        await slider.expectOutput(value)
    })      
})
})