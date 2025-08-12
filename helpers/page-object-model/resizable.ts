import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/* @Author: Thu Nguyen */
export class Resizable {

     private readonly ctrConstraintArea;
     private readonly ctrRszBoxRst;
     private readonly ctrRszBox;
     private readonly ctrRszAreaRst;
     private readonly ctrRszArea;
     private boxRstWidth;
     private boxRstHeight;
     private boxWidth;
     private boxHeight;

    /** Constructor of class Resizable
    @param page the fixture Page
    */
     constructor(public readonly page: Page) {
        
        this.ctrConstraintArea = this.page.locator('.constraint-area');
        this.ctrRszBoxRst = this.page.locator('#resizableBoxWithRestriction');
        this.ctrRszBox = this.page.locator('#resizable');
        this.ctrRszAreaRst = this.page.locator('xpath=//div[@id="resizableBoxWithRestriction"]/span[@class="react-resizable-handle react-resizable-handle-se"]');
        this.ctrRszArea = this.page.locator('xpath=//div[@id="resizable"]/span[@class="react-resizable-handle react-resizable-handle-se"]');
        this.boxRstWidth = 200;
        this.boxRstHeight = 200;
        this.boxWidth = 200;
        this.boxHeight = 200;
        
     }

     /** Resize a box to a size that is x and y bigger or smaller  in the width and height respectively
     @param locator The locator of the resizable handle area, which should be dragged, in the box 
     @param xCrd distance in x coordinate 
     @param yCrd distance in y coordinate
     */
     async resizeBox(locator: Locator, xCrd: number, yCrd: number){

        await locator.scrollIntoViewIfNeeded();
        await locator.hover();
        await locator.focus();
        await locator.dispatchEvent('mousedown');  
        await this.page.mouse.down();        
        await this.page.mouse.move(xCrd, yCrd);
        await locator.dispatchEvent('mouseup');
 
     }

     /** Resize the Box in the restriction area (the 1st. box) 
        @param xCrd distance in x coordinate 
        @param yCrd distance in y coordinate
     */
     async resizeBoxWithRestriction(xCrd: number, yCrd: number){
        // Store the old size of the box before resizing
        let temp = await this.ctrRszBoxRst.getAttribute('style');
        this.boxRstWidth = temp.substr(7,3);
        this.boxRstHeight = temp.substr(-6,3);
        
        await this.resizeBox(this.ctrRszAreaRst,xCrd, yCrd);
     }

     /** Resize the Box below (the 2nd. box) 
        @param xCrd distance in x coordinate 
        @param yCrd distance in y coordinate
     */
     async resizeBoxWithoutRestriction(xCrd: number, yCrd: number){
        // Store the old size of the box before resizing
        let temp = await this.ctrRszBoxRst.getAttribute('style');
        this.boxWidth = temp.substr(7,3);
        this.boxHeight = temp.substr(-6,3);
        
        await this.resizeBox(this.ctrRszArea, xCrd, yCrd);
     }

     /** Verify if the new size of a box corresponds to the resizing parameters
     @param oldWidth The old width of the box
     @param oldHeight The old height of the box
     @param newWidth The new width of the box
     @param newHeight The new height of the box
     @param xCrd distance in x coordinate
     @param yCrd distance in y coordinate
     */
     async expectResizing(oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, xCrd: number, yCrd: number){
        
        let diffWith= newWidth - oldWidth;
        let diffHeight = newHeight - oldHeight;

        await expect(diffWith).toBe(xCrd);
        await expect(diffHeight).toBe(yCrd);
     }

     /** Verify if the new size of the box in the restriction area (1st. box) corresponds to the resizing parameters
     @param xCrd distance in x coordinate
     @param yCrd distance in y coordinate
     */
     async expectResizingWithRestriction(xCrd: number, yCrd: number){
        // Get the new size of the box after resizing
        let temp = await this.ctrRszBoxRst.getAttribute('style');
        let width = temp.substr(7,3);
        let height = temp.substr(-6,3);

        await this.expectResizing(this.boxRstWidth, this.boxRstHeight,width, height, xCrd, yCrd);
     }

     /** Verify if the new size of the box below (2nd. box) corresponds to the resizing parameters
     @param xCrd distance in x coordinate
     @param yCrd distance in y coordinate
     */
     async expectResizingWithoutRestriction(xCrd: number, yCrd: number){
        // Get the new size of the box after resizing
        let temp = await this.ctrRszBox.getAttribute('style');
        let width = temp.substr(7,3);
        let height = temp.substr(-6,3);

        await this.expectResizing(this.boxRstWidth, this.boxRstHeight,width, height, xCrd, yCrd);
     }

    }