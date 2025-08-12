import { test, expect, type Page} from '@playwright/test';
import { Frames } from '../helpers/page-object-model/frames';

/* @Author: Thu Nguyen */
test.beforeEach(async ({ page }) => {
  test.slow();
  await page.goto('frames',{waitUntil: 'domcontentloaded'});
});


test(`Check the text in frames`, async ({page}) => {
        
      let frames: Frames = await new Frames(page);
      // Verify the text in the frames
      await frames.expectTextinFrame1();
      await frames.expectTextinFrame2();
    
    })   

/* No teardown is necessary */