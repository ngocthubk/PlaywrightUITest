## Playwright on DemoQA
### Objective
<p> This project aims to experiment the test framework Playwright with Typescript.
 Therefore, the tests focus on covering a variety of web-element types, especially tricky ones, and techniques, NOT on covering the functions or behaviors of the web application. </p>

 <p>Tests are created to test the web application https://demoqa.com/. 
 The requirements are unknown. No APIs are available.
 </p>

 ### Author:
<p> Name: Thu Nguyen
</p>
<p>
Email: ngocthubk@gmail.com
</p>

### How to view the test result in Github 
1. Go to the tab Actions,
2. Click on a workflow run you want to view,
3. Click on "test" to view the test results of this run.
   
### How to run the test locally:
1. Clone the project to the local machine
2. Copy the file .env.sample to .env.local
3. Open the file .env.local, replace the values #InputYourUsername# and #InputYourPassword# with your username and password respectively on DemoQA
4. Run the test with the standard command: npx playwright test


