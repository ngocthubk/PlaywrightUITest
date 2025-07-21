import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class DatePicker {

     private readonly ctrSelectDate;
     private readonly ctrDateAndTime;
     private readonly ctrYear;
     private readonly ctrMonth;
   
    /* Constructor of class Slider
    @param page the fixture Page
    */
     constructor(public readonly page: Page) {
        
        this.ctrSelectDate = this.page.locator('#datePickerMonthYearInput');
        this.ctrDateAndTime = this.page.locator('#dateAndTimePickerInput');
        this.ctrYear = this.page.locator('.react-datepicker__year-select');
        this.ctrMonth = this.page.locator('.react-datepicker__month-select');
        
     }
     /* Enter the date directly in the control Select Date
     @param date The date value 
     */
     async enterDate(date: string){
         await this.ctrSelectDate.fill('07/21/2025');

     }

     /* Process the string date: split them into day, month and year and convert month to the month name
     @param date The date value 
     */
     processDate(date: string):string[]{
         var year = date.substring(6);
         var month = date.substring(0,2);
         var day = date.substring(3,5);
         var monthMap = new Map([
         ["01","January"],
         ["02", "February"],
         ["03","March"],
         ["04","April"],
         ["05","May"],
         ["06","June"],
         ["07","July"],
         ["08","August"],
         ["09","September"],
         ["10","October"],
         ["11","November"],
         ["12","December"]     
         ]);
        
         month = monthMap.get(month)!;

         //  Convert day smaller than 10 to a single digit, but again in string
         day = (Number(day)%31).toString();

         return [day,month,year];
     }

     /* Convert the string date to a format 'Month Day, Year'
     @param date The date value
     */
     convertDate(date: string): string{
         var arrDate = this.processDate(date);
         var year = arrDate[2];
         var month = arrDate[1]
         var day = arrDate[0];
         
         switch (Number(day)%10) {
            case 1:
               day = day + "st";
               break;
            case 2:
               day = day + "nd";
               break;
            case 3:
               day = day + "rd";
               break;           
            default:
               day = day + 'th';
         }
            
         var fullDate = arrDate[1] + ' ' + day + ', ' + year;
         return fullDate;

     }

     /* Select date from the date picker
     @param date The date value
     */
     async selectDate(date: string){
         var arrDate = this.processDate(date);         
         var fullDate = this.convertDate(date);
         await this.ctrSelectDate.click();
         await this.ctrYear.selectOption(arrDate[2]);
         await this.ctrMonth.selectOption(arrDate[1]);
         await this.page.locator('xpath=//*[contains(@aria-label,"' + fullDate +'")]').click();
     }

     async selectDateAndTime(){

     }
     
     /* Verify the value in the control Select Date 
     @param date The date value
     */
     async expectDate(date: string){
         await expect(this.ctrSelectDate).toHaveValue(date);
     }

    }