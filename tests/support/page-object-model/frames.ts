import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/* @Author: Thu Nguyen */
export class Frames {

     private readonly ctrFrame1;
     private readonly ctrFrame2;
     private readonly ctrHeading1;
     private readonly ctrHeading2;

    /* Constructor of class Frames
    @param page the fixture Page
    */
     constructor(public readonly page: Page) {
        
        this.ctrFrame1 = this.page.frameLocator('#frame1')
        this.ctrFrame2 = this.page.frameLocator('#frame2')
        this.ctrHeading1 = this.ctrFrame1.getByText('This is a sample page');
        this.ctrHeading2 = this.ctrFrame2.getByRole('heading',{id: 'sampleHeading'});
        
     }

     /* Check the text appears in the 1st. frame 
     */
     async expectTextinFrame1(){        
      
        await expect(await this.ctrHeading1.textContent()).toContain("This is a sample page");
     }

     /* Check the text appears in the 2nd. frame 
     */
     async expectTextinFrame2(){
  
        await expect(await this.ctrHeading2).toHaveText("This is a sample page");
        
     }
}