import { test, expect, type Page} from '@playwright/test';
import { Resizable } from '../helpers/page-object-model/resizable';

/* @Author: Thu Nguyen */
test.beforeEach(async ({ page }) => {
  test.slow();
  await page.goto('resizable',{waitUntil: 'domcontentloaded'});
});


test.describe('Resize the boxes',()=> {
    [
        {x: 20, y: 30},       
        {x: 300, y: 100},
    ].forEach(({x,y}) => {
    test(`Resize the box in the restriction area in x distance ${x} and y distance ${y}`, async ({page}) => {
        
        let resizable: Resizable = await new Resizable(page);
        // Make the size of the box change in x and y in horizontal and vertical dimensions respectively
        await resizable.resizeBoxWithRestriction(x,y);
        // Verify if the difference of box size is ${x} and ${y}
        await resizable.expectResizingWithRestriction(x,y);
    })
    }) ;
    [
        {x: 40, y: 40},
        {x: 400, y: 400},
    ].forEach(({x,y}) => {
    test(`Resize the box below in x distance ${x} and y distance ${y}`, async ({page}) => {
        
        let resizable: Resizable = await new Resizable(page);
        // Make the size of the box change in x and y in horizontal and vertical dimensions respectively
        await resizable.resizeBoxWithoutRestriction(x,y);
        // Verify if the difference of box size is ${x} and ${y}
        await resizable.expectResizingWithoutRestriction(x,y);
    })
    });
})
/* No teardown is necessary */
