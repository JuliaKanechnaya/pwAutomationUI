import { test as it, expect } from "@playwright/test";

it.describe("DEMO QA FORM PAGE", () => {
  it.beforeEach(async ({ page }) => {
    await page.goto(
      "https://demoqa.com/automation-practice-form#google_vignette"
    );
    await expect(page.locator('[class="text-center"]')).toContainText(
      "Practice Form"
    );
  });
  it.describe("POSITIVE", () => {
    it.only("Fill in all fields with valid data and submit", async ({
      page,
    }) => {
      await page.locator("#firstName").fill("John");
      await page.locator("#lastName").fill("Doe");
      await page.locator("#userEmail").fill("johndoe@example.com");

      //   await page.locator("[#genterWrapper] ~ [div.col-md-9.col-sm-12] ~ [div.custom-control.custom-radio.custom-control-inline] ~ [input#gender-radio-1]").check();
    //   await page.locator('[name="gender"]').check({ force: true })
    // const radiobutton = await page.locator('#gender-radio-1')
    // await radiobutton.check();
    await page.locator('[for="gender-radio-1"]').check();
    //   await page.locator('#gender-radio-1').getByLabel('Male').check();
    // await page.getByRole('radio', {name: 'Male'}).check();
    // await page.check('#gender-radio-1');  
    await page.locator("#userNumber").fill("1234561234");
      await page.locator("#dateOfBirthInput").click();

      await page
        .locator('[class="react-datepicker__month-select"]')
        .selectOption({ label: "April" });
      await page
        .locator('[class="react-datepicker__year-select"]')
        .selectOption({ label: "1990" });
      await page
        .getByRole("listbox", { name: "month 1990-04" })
        .locator("div.react-datepicker__day.react-datepicker__day--024")
        .click();

      await expect(page.locator("#dateOfBirthInput")).toHaveValue(
        "24 Apr 1990"
      );

      await page.locator("#subjectsInput").fill("Math, History");

      await page.locator('#uploadPicture').setInputFiles('tests/data/file.txt')

      //   await page.locator("#hobbies-checkbox-1").setChecked(true);

      // await page.getByLabel('Sports').check()

      //   await page.locator("#submit").click();
      await page.locator('[placeholder="Current Address"]').fill('11 Funny Street')
      await page.locator('#state').click();
      await page.locator('#react-select-3-option-2').click();
      await page.locator('#city').click();
      await page.locator('#react-select-4-option-1').click();
    });
    it("Fill in only required fields with valid data and submit", async ({
      page,
    }) => {});
  });

  it.describe("NEGATIVE", () => {
    it("All required fields are empty", async ({ page }) => {});
    it("One required field is empty", async ({ page }) => {});
  });
});
