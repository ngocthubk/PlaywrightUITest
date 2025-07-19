import type { Page, Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

/* @Author: Thu Nguyen */
export class BookStore {

    private readonly ctrSearchBox;
    private readonly ctrSearchButton;
    private readonly ctrLogout;
    private readonly ctrBookItem;
    private readonly ctrBookStore;

    /* Constructor of class Slider
    @param page the fixture Page
    */
     constructor(public readonly page: Page) {
        
        this.ctrSearchBox = this.page.getByPlaceholder('Type to search');
        this.ctrSearchButton = this.page.locator('#basic-addon2');
        this.ctrLogout = this.page.getByRole('button',{name: 'Log out'});
        this.ctrBookItem = this.page.locator('.mr-2');
        
     }

     /* Open the page Bookstore */
     async goto(){
         await  this.page.goto('https://demoqa.com/books');
     }
   
     /* Input into the search box
     @param text The search keyword
      */
     async inputSearch(text: string){
        await this.ctrSearchBox.fill(text);
        await this.ctrSearchButton.click();
     }

     /* Logout */
     async logout(){
        await this.ctrLogout.click();
     }

     /* Check the search result 
     @param text The search keyword
     @param amount The number of the books
     */
     async expectSearchResult(text: string, amount: number){
         let contents = await this.ctrBookItem.allTextContents();
         
         // Verify the number of books
         await expect(contents.length).toBe(amount);
         if(amount ==0){
            await console.log('No book containing ' + text+ ' is found');
            return;
         }else{
            var i;
            // Verify if each result item contains the text
            for(i=0;i<contents.length;i++){
            
               await expect(contents[i].toLowerCase()).toContain(text.toLowerCase());
            }
         }
     }
      
    }