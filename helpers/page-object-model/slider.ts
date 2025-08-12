import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/* @Author: Thu Nguyen */
export class Slider {

    private readonly ctrSlider;
    private readonly ctrOutput;

    /** Constructor of class Slider
    @param page the fixture Page
    */
    constructor(public readonly page: Page) {
        this.ctrSlider = this.page.getByRole('slider');
        this.ctrOutput = this.page.locator('#sliderValue')

    }

    /** Drag the slider
    @param value The value, to which the slider is dragged
     */
    async dragSlider(value: number){

        await this.ctrSlider.fill(value.toString());
    }

    /** Check if the output shows the value of the slider correctly
    @param value The value, which the output should show
    */
    async expectOutput(value: number){
        await expect(this.ctrOutput).toHaveValue(value.toString());
    }
}