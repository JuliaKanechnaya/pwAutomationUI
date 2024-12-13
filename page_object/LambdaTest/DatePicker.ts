import { expect, Locator, Page } from "@playwright/test";
import { _ } from "lodash";

export class DatePicker {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //Selectors
  header: string = "h1";
  url: string =
    "https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo";
  //From and To selectors
  fromInput: string = "#from";
  toInput: string = "#to";
  prevMonth: string = '[title="Prev"]';
  dateOfTheYear: string = '[class="ui-datepicker-year"]';
  dateOfTheMonth: string = ".ui-datepicker-month";
  dayFromComponent: string = "#ui-datepicker-div";

  public async verifyHeader() {
    const header: Locator = this.page.locator(this.header);
    await expect(header).toContainText("Date Picker");
  }
  public async open() {
    await this.page.goto(this.url);
  }

  // From and To random values
  randomYearFromNumber = _.random(1, 50);
  // randomYearNumber = Math.floor(Math.random() * 100);
  randomYearToNumber = _.random(1, this.randomYearFromNumber);
  dayFrom = _.random(1, 31);
  dayTo = _.random(1, 31);

  private selectedFromDate: {
    year: number;
    month: string;
    day: number;
  } | null = null;
  public async pickDate(fromOrToValue: string) {
    //original
    // if (fromOrToValue !== "from" && fromOrToValue !== "to") {
    //   console.error(
    //     `dateFromToday() method can only accept 'from' and 'to' values`
    //   );
    //   return;
    // }

    //optimized
    if (!["from", "to"].includes(fromOrToValue)) {
      console.error(`pickDate() method can only accept 'from' and 'to' values`);
      return;
    }
    let monthsMapping = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    // Determine input field and clicks based on input

    // original
    // let inputField = this.fromInput;
    // let clicksNumber = this.randomYearFromNumber;
    // let dayValue = this.dayFrom;
    // if (fromOrToValue === "to") {
    //   inputField = this.toInput;
    //   clicksNumber = this.randomYearToNumber;
    //   dayValue = this.dayTo;
    // }

    // optimized
    const inputField = fromOrToValue === "from" ? this.fromInput : this.toInput;
    const clicksNumber =
      fromOrToValue === "from"
        ? this.randomYearFromNumber
        : this.randomYearToNumber;
    let dayValue = fromOrToValue === "from" ? this.dayFrom : this.dayTo;
    console.log(`${clicksNumber} prev month clicks performed`);

    // Open the date picker
    await this.page.locator(inputField).click();

    // Navigate to the desired month
    for (let i = 0; i < clicksNumber; i++) {
      await this.page.locator(this.prevMonth).click();
    }

    // Extract year and month

    // original
    // let year = await this.page.locator(this.dateOfTheYear).textContent();
    // let month = await this.page
    //   .locator(this.dateOfTheMonth)
    //   .locator('[selected="selected"]')
    //   .textContent();

    // optimized
    let year = +(
      await this.page.locator(this.dateOfTheYear).textContent()
    )?.trim();
    let monthStringValue = (
      await this.page
        .locator(this.dateOfTheMonth)
        .locator('[selected="selected"]')
        .textContent()
    )?.trim();
    const monthCodeValue = +(await this.page.locator(this.dateOfTheMonth)
    .locator('[selected="selected"]').getAttribute('value')) + 1
    console.log(`monthValue: ${monthCodeValue}`)

    if (!year || !monthStringValue) {
      throw new Error("Failed to retrieve year or month from the date picker.");
    }

    // Adjust day for month-specific and leap year constraints

    // Original
    // if (month === "Feb" && dayValue > 29 && +year % 4 === 0) {
    //   dayValue = _.random(1, 29);
    // }
    // if (month === "Feb" && dayValue > 28 && +year % 4 !== 0) {
    //   dayValue = _.random(1, 28);
    // }
    // if (
    //   month === "Apr" ||
    //   month === "Jun" ||
    //   month === "Sep" ||
    //   month === "Nov"
    // ) {
    //   dayValue = _.random(1, 30);
    // }
    // console.log(year, "year");
    // console.log(month, "month");
    // console.log(dayValue, "day");

    // Optimized
    const isLeapYear = +year % 4 === 0;
    const maxDays = {
      Feb: isLeapYear ? 29 : 28,
      Apr: 30,
      Jun: 30,
      Sep: 30,
      Nov: 30,
      Default: 31,
    };
    const validDays = maxDays[monthStringValue] || maxDays.Default;
    if (dayValue > validDays) {
      dayValue = _.random(1, validDays);
    }

    console.log(
      `${fromOrToValue}: Year: ${year}, Month: ${monthStringValue}, Day: ${dayValue}`
    );

    // Validation for 'to' date
    if (fromOrToValue === "to" && this.selectedFromDate) {
      const {
        year: fromYear,
        month: fromMonth,
        day: fromDay,
      } = this.selectedFromDate;

      if (year === fromYear && monthStringValue === fromMonth && dayValue <= fromDay) {
        dayValue = _.random(fromDay + 1, validDays);
      }
    }

    // Select the day in the date picker
    await this.page
      .locator(this.dayFromComponent)
      .getByRole("link", { name: dayValue, exact: true })
      .click();

    // Store 'from' date after it's selected
    if (fromOrToValue === "from") {
      this.selectedFromDate = { year, month: monthStringValue, day: dayValue };
    }

    // Format and verify the selected date
    const formattedDay = dayValue < 10 ? `0${dayValue}` : String(dayValue);
    // const expectedDate = `${monthsMapping[monthStringValue]}/${formattedDay}/${year}`;
    const formattedMonth = monthCodeValue < 10 ? `0${monthCodeValue}` : String(monthCodeValue);
    const expectedDate = `${formattedMonth}/${formattedDay}/${year}`;
    const actualInputValue = await this.page.locator(inputField).inputValue();
    expect(actualInputValue).toBe(expectedDate);

    console.log(`Selected date: ${expectedDate}`);

    // await this.page.pause();
  }

  //   method created during online lecture
  //   public async dateFromToday() {
  //     let monthsMapping = {
  //       Jan: "01",
  //       Feb: "02",
  //       Mar: "03",
  //       Apr: "04",
  //       May: "05",
  //       Jun: "06",
  //       Jul: "07",
  //       Aug: "08",
  //       Sep: "09",
  //       Oct: "10",
  //       Nov: "11",
  //       Dec: "12",
  //     };
  //     await this.page.locator(this.toInput).click();
  //     for (let i = 0; i < this.randomYearToNumber; i++) {
  //       await this.page.locator(this.prevMonth).click();
  //     }
  //     console.log(this.randomYearToNumber);
  //     let year = await this.page.locator(this.dateOfTheYear).textContent();
  //     let month = await this.page
  //       .locator(this.dateOfTheMonth)
  //       .locator('[selected="selected"]')
  //       .textContent();
  //     console.log(year, "year");
  //     console.log(month, "month");
  //     console.log(this.day, "day");
  //     await this.page
  //       .locator(this.dayFromComponent)
  //       .getByRole("link", { name: this.day, exact: true })
  //       .click();
  //     expect(await this.page.locator(this.fromInput).inputValue()).toBe(
  //       `${monthsMapping[month]}/${this.day}/${year}`
  //     ); //mm/dd/yyyy

  //     // await this.page.pause();
  //   }
}
