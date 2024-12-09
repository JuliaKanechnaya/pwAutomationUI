import { test as it } from '@playwright/test'

it.describe('FORM PAGE', () => {
    it.beforeAll(() => {
        console.log('beforeAll');
    });
    it.afterAll(() => {
        console.log('afterAll');
    });
    it.beforeEach(() => {
        console.log('beforeEach');
    });
    it.afterEach(() => {
        console.log('afterEach');
    });
    it('Fill in all fields in form', async ({page}) => {
        // console.log('Form page');
        // const browser = chromium.launch()
        // const context = browser.newContext()
        // const page = context.newPage()
        await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo')
        // await page.pause()
        await page.locator('#name').fill('Julia')
        // await page.pause()
        await page.locator('#inputEmail4').fill('julie.doe@example.com')
        await page.locator('[placeholder="Password"]').pressSequentially('password123', {delay:50})
        await page.locator('[for="companyname"] ~ [placeholder="Company"]').fill('Happy LLC')
        await page.selectOption('[name="country"]', {label: 'Austria'})
        await page.pause()
        await page.getByPlaceholder('Address 1').fill('701 Tobie St')
        await page.locator('label:has-text("City*") ~ input#inputCity').fill('New York')
        await page.getByRole('textbox', {name: 'Zip Code'}).fill('10001')
        // await browser.close()
    })
})