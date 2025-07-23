import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { DateFormat } from '../common/dateFormat';

export class DatePicker {

     private readonly ctrSelectDate;
     private readonly ctrDateAndTime;
     private readonly ctrYear;
     private readonly ctrMonth;
   
    /* Constructor of class DatePicker
    @param page the fixture Page
    */
     constructor(public readonly page: Page) {
        
        this.ctrSelectDate = this.page.locator('#datePickerMonthYearInput');
        this.ctrDateAndTime = this.page.locator('#dateAndTimePickerInput');
        this.ctrYear = this.page.locator('.react-datepicker__year-select');
        this.ctrMonth = this.page.locator('.react-datepicker__month-select');
        
     }
     /* Enter the date directly in the control Select Date
     @param date The date value in the format MM/dd/yyyy, e.g. 07/21/2025
     */
     async enterDate(date: string){
         await this.ctrSelectDate.fill('07/21/2025');

     }

    

     /* Select date from the date picker
     @param date The date value in the format MM/dd/yyyy, e.g. 07/21/2025
     */
     async selectDate(date: string){
        var dateFormat: DateFormat = new DateFormat(date);
        var arrDate = dateFormat.processDate(date);         
        var fullDate = dateFormat.convertDate(date);
        var ctrDate: Locator;
         await this.ctrSelectDate.click();
         await this.ctrYear.selectOption(arrDate[2]);
         await this.ctrMonth.selectOption(arrDate[1]);
         ctrDate = await this.page.locator('xpath=//*[contains(@aria-label,"' + fullDate +'")]');
         await ctrDate.hover();
         await ctrDate.click();
     }
 
     async selectDateAndTime(){

     }
     
     /* Verify the value in the control Select Date 
     @param date The date value in the format MM/dd/yyyy, e.g. 07/21/2025
     */
     async expectDate(date: string){
         await expect(this.ctrSelectDate).toHaveValue(date);
     }

    }