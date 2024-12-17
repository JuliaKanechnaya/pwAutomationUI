import { expect, Locator, Page } from "@playwright/test";

export class DragAndDrop {
  private readonly page: Page;
  private readonly dragElement: Locator;
  private readonly dropZone: Locator;
  private readonly dropList: Locator;
  private readonly dragElementDemo2: Locator;
  private readonly dropZoneDemo2: Locator;
  constructor(page: Page) {
    this.page = page;
    this.dragElement = page.locator('[draggable="true"]');
    this.dropZone = page.locator("#mydropzone");
    this.dropList = page.locator("#droppedlist");
    this.dragElementDemo2 = page.locator("#draggable");
    this.dropZoneDemo2 = page.locator("#droppable");
  }

  /**
   * perform drag-and-drop using Playwright's dragTo method
   * @param text - Text content of the element to drag
   */
  public async dragAndDropElement(text: string): Promise<void> {
    const dragSource = this.dragElement.filter({ hasText: text });
    console.log("got the element");
    await dragSource.dragTo(this.dropZone);
    await this.verifyDrop(text);
  }
  /**
   *
   * @param text - Text content of the element to drag
   */
  public async dragAndDropElementManually(text: string): Promise<void> {
    const dragSource = this.dragElement.filter({ hasText: text });
    await dragSource.hover();
    await this.page.mouse.down();
    await this.dropZone.hover();
    await this.page.mouse.up();
    await this.verifyDrop(text);
  }
  /**
   * Verify that drag element's text appears in the drop list
   * @param text - Text to vefiry dpor
   */
  private async verifyDrop(text: string): Promise<void> {
    const dropListText = await this.dropList.textContent();
    expect(dropListText).toContain(text);
  }
  /**
   * Drag and drop element using Playwright's dragTo method
   */
  public async dragAndDropElementDemo2(): Promise<void> {
    await this.verifyDropDemo2BeforeDrag();
    await this.dragElementDemo2.dragTo(this.dropZoneDemo2);
    await this.verifyDropDemo2AfrerDrop();
  }
  /**
   * Drag and drop element using Playwright's manual method
   *  */ public async dragAndDropElementDemo2Manually(): Promise<void> {
    await this.verifyDropDemo2BeforeDrag();
    await this.dragElementDemo2.hover();
    await this.page.mouse.down();
    await this.dropZoneDemo2.hover();
    await this.page.mouse.up();
    await this.verifyDropDemo2AfrerDrop();
  }
  /**
   * Verigy graggable zone background color and text before drag and drop
   */
  private async verifyDropDemo2BeforeDrag() {
    await expect(this.dropZoneDemo2).toHaveCSS(
      "background-color",
      "rgb(233, 233, 233)"
    );
    await expect(this.dropZoneDemo2).toContainText("Drop here");
  }
  /**
   * Verigy graggable zone background color and text after drag and drop
   */
  private async verifyDropDemo2AfrerDrop() {
    await expect(this.dropZoneDemo2).toHaveCSS(
      "background-color",
      "rgb(14, 186, 197)"
    );
    await expect(this.dropZoneDemo2).toContainText("Dropped!");
  }
/**
 * Open Drag and Drop page on Lambda test
 */
  public async open(): Promise<void> {
    const url = process.env.LAMBDA
      ? `${process.env.LAMBDA}/selenium-playground/drag-and-drop-demo`
      : "https://www.lambdatest.com/selenium-playground/drag-and-drop-demo";
    await this.page.goto(url);
  }
}
