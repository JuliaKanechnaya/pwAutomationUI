import { expect, Locator, Page } from "@playwright/test";

export class DatePicker {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    header: string = 'h1';
    url: string = 'https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo'
    async verifyHeader() {
        const header: Locator = this.page.locator(this.header);
        await expect(header).toContainText('Date Picker')
    }
    async open() {
        await this.page.goto(this.url);
    }
}