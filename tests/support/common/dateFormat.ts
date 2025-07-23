 /* Author: Thu Nguyen */
 export class DateFormat{
 
   private date:string
   constructor(date: string) {

      this.date=date;    
           
   }
   /* Convert the month MM into the month name
     @param month: Month in the format MM, e.g. "01"
     @return month name
     */
     convertMonth(month:string):string {
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
         return month;
     }

     /* Process the string date: split them into day, month and year and convert month to the month name
     @param date The date value in the format MM/dd/yyyy, e.g. 07/21/2025
     @return an array of [day, month name, year]
     */
     processDate(date: string):string[]{
         var year = date.substring(6);
         var month = date.substring(0,2);
         var day = date.substring(3,5);
         month = this.convertMonth(month);

         //  Convert day smaller than 10 to a single digit, but again in string
         day = (Number(day)%31).toString();

         return [day,month,year];
     }

     /* Convert the string date to a format 'Month Day, Year'
     @param date The date value in the format MM/dd/yyyy, e.g. 07/21/2025
     @return string date in the format 'Month Day, Year'
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
   }