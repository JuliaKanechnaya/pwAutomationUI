import { expect, Locator, Page } from "@playwright/test";

export class DragAndDrop {
  private readonly page: Page;
  private readonly dragElement: Locator;
  private readonly dropZone: Locator;
  private readonly dropList: Locator;
  constructor(page: Page) {
    this.page = page;
    this.dragElement = page.locator('[draggable="true"]');
    this.dropZone = page.locator("#mydropzone");
    this.dropList = page.locator("#droppedlist");
  }

  /**
   * perform drag-and-drop using Playwright's dragTo method
   * @param text - Text content of the element to drag
   */
  public async dragAndDropElement(text: string): Promise<void> {
    const dragSource = this.dragElement.filter({ hasText: text });
    console.log("got the element");
    await dragSource.dragTo(this.dropZone);
    await this.verifyDrop(text)
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
    await this.verifyDrop(text)
  }
/**
 * Verify that drag element's text appears in the drop list 
 * @param text - Text to vefiry dpor
 */
  private async verifyDrop (text:string): Promise<void> {
    const dropListText = await this.dropList.textContent();
    expect(dropListText).toContain(text);
  }
}
