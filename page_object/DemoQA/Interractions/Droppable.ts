import { expect, Locator, Page } from "@playwright/test";

export class Droppable {
  private readonly page: Page;
  private readonly url: string;
  private readonly simpleTab: Locator;
  private readonly acceptTab: Locator;
  private readonly preventPropagationTab: Locator;
  private readonly revertDraggableTab: Locator;
  private readonly dropHere: Locator;
  private readonly dropHereZoneSimple: Locator;
  private readonly dragMeElSimple: Locator;
  private readonly acceptableEl: Locator;
  private readonly notAcceptableEl: Locator;
  private readonly dropHereZoneAccept: Locator;
  private readonly dropHereZoneRevert: Locator;
  private readonly notRevertEl: Locator;
  private readonly willRevertEl: Locator;
  private readonly dragMeElPrevPropo: Locator;
  private readonly innerDropNotGreedy: Locator;
  private readonly outerDropNotGreedy: Locator;
  private readonly innerDropGreedy: Locator;
  private readonly outerDropGreedy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = process.env.DEMOQA
      ? `${process.env.DEMOQA}/droppable`
      : "https://demoqa.com/droppable";

    // Simple tab selectors
    this.simpleTab = this.page.locator("#droppableExample-tab-simple");
    this.dragMeElSimple = this.page.locator("#draggable");
    this.dropHereZoneSimple = this.page.locator(
      "#simpleDropContainer #droppable"
    );

    // Accept tab selectors
    this.acceptTab = this.page.locator("#droppableExample-tab-accept");
    this.acceptableEl = this.page.locator("#acceptable");
    this.notAcceptableEl = this.page.locator("#notAcceptable");
    this.dropHereZoneAccept = this.page.locator(
      "#acceptDropContainer #droppable"
    );

    // Prevent Propagation tab selectors
    this.preventPropagationTab = this.page.locator(
      "#droppableExample-tab-preventPropogation"
    );
    this.dragMeElPrevPropo = this.page.locator("#dragBox");
    this.innerDropNotGreedy = this.page.locator("#notGreedyInnerDropBox");
    this.outerDropNotGreedy = this.page.locator("#notGreedyDropBox");
    this.innerDropGreedy = this.page.locator("#greedyDropBoxInner");
    this.outerDropGreedy = this.page.locator("#greedyDropBox");

    // Revert Draggable tab selectors
    this.revertDraggableTab = this.page.locator(
      "#droppableExample-tab-revertable"
    );
    this.notRevertEl = this.page.locator("#notRevertable");
    this.willRevertEl = this.page.locator("#revertable");
    this.dropHereZoneRevert = this.page.locator(
      "#revertableDropContainer #droppable"
    );
  }

  /**
   * Open Droppable interanction page in DemoQA
   */
  public async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  defaultColor = "rgba(0, 0, 0, 0)";
  dropColor = "rgb(70, 130, 180)";
  onMoveColor = "rgba(0, 0, 0, 0)";
  onHoverColor = "rgb(60, 179, 113)";
  defaultText = "Drop here";
  dropText = "Dropped!";
  dropZoneSelector: Locator;
  dragZoneSelector: Locator;
  /**
   * Opens corresponding tab on the Droppable page
   * @param tab - string: Title of the tab to open. Accepted values: 'Simple', 'Accept', 'Prevent Propogation', or 'Revert Draggable'
   * @param elToDrag - string: Title of the element to drag. Accepted values: 'Acceptabble', 'Not Acceptable', or 'Will Revert', 'Not Revert', or 'Drag Me' (optinal)
   */
  private async selectTab(tab: string, elToDragOrDrop?: string): Promise<void> {
    if (["Simple", "simple"].includes(tab)) {
      await this.simpleTab.click();
      this.dropZoneSelector = this.dropHereZoneSimple;
      this.dragZoneSelector = this.dragMeElSimple;
      this.onMoveColor = this.defaultColor;
      this.onHoverColor = this.defaultColor;
    } else if (["Accept", "accept"].includes(tab)) {
      await this.acceptTab.click();
      this.dropZoneSelector = this.dropHereZoneAccept;
      if (
        !["acceptable", "not acceptable"].includes(
          elToDragOrDrop.trim().toLowerCase()
        )
      ) {
        throw new Error(
          "Invalid title of the element to drag: " + elToDragOrDrop
        );
      }
      if (["acceptable"].includes(elToDragOrDrop.trim().toLowerCase())) {
        this.dragZoneSelector = this.acceptableEl;
        this.onHoverColor = "rgb(60, 179, 113)";
        this.onMoveColor = "rgb(60, 179, 113)";
      } else {
        this.dragZoneSelector = this.notAcceptableEl;
        this.dropColor = this.defaultColor;
        this.dropText = this.defaultText;
        this.onHoverColor = this.defaultColor;
        this.onMoveColor = this.defaultColor;
      }
    } else if (["prevent propogation"].includes(tab.trim().toLowerCase())) {
      await this.preventPropagationTab.click();
      this.dragZoneSelector = this.dragMeElPrevPropo;
      const areaToDropTrim = elToDragOrDrop.trim().toLowerCase();
      if (
        ![
          "outer droppable (not greedy)",
          "inner droppable (not greedy)",
          "outer droppable (greedy)",
          "inner droppable (greedy)",
        ].includes(areaToDropTrim)
      ) {
        throw new Error(
          "Invalid title of the element to drop: " + areaToDropTrim
        );
      }
      if (areaToDropTrim === "outer droppable (not greedy)") {
        this.dropZoneSelector = this.outerDropNotGreedy;
        this.defaultText = "Outer droppable";
        this.onHoverColor = 'rgb(143, 188, 143)'
      } else if (areaToDropTrim === "inner droppable (not greedy)") {
        this.dropZoneSelector = this.innerDropNotGreedy;
        this.defaultText = "Inner droppable (not greedy)";
        this.onMoveColor = "rgb(60, 179, 113)"
      } else if (areaToDropTrim === "outer droppable (greedy)") {
        this.dropZoneSelector = this.outerDropGreedy;
        this.defaultText = "Outer droppable";
      } else {
        this.dropZoneSelector = this.innerDropGreedy;
        this.defaultText = "Inner droppable (greedy)";
      }
    } else if (["revert draggable"].includes(tab.trim().toLowerCase())) {
      await this.revertDraggableTab.click();
      this.dropZoneSelector = this.dropHereZoneRevert;
      this.onHoverColor = "rgb(143, 188, 143)";
      this.onMoveColor = "rgb(60, 179, 113)";
      if (
        !["will revert", "not revert"].includes(
          elToDragOrDrop.trim().toLowerCase()
        )
      ) {
        throw new Error(
          "Invalid title of the element to drag: " + elToDragOrDrop
        );
      }
      if (["not revert"].includes(elToDragOrDrop.trim().toLowerCase()))
        this.dragZoneSelector = this.notRevertEl;
      else {
        this.dragZoneSelector = this.willRevertEl;
      }
    } else throw new Error("Invalid tab name: " + tab);
  }
  /**
   * This method verifies drop zone chaarcteristics (color and text)
   * @param color - Expected background color of the drop zone
   * @param text - Expected text of the drop zone
   * @param locator - Drop zone locator
   */
  private async verifyStateOfDropZone(
    color: string,
    text: string,
    locator: Locator
  ): Promise<void> {
    await expect(locator).toHaveCSS("background-color", color);
    await expect(locator).toContainText(text);
  }

  /**
   * Drag and drop element using Playwraight .dragTo method and
   * verify drop zone color and text before and after the action is performed
   */
  public async dragAndDropUsingDragTo(
    tab: string,
    elToDragOrDrop?: string
  ): Promise<void> {
    await this.selectTab(tab, elToDragOrDrop);
    await this.verifyStateOfDropZone(
      this.defaultColor,
      this.defaultText,
      this.dropZoneSelector
    );
    await this.dragZoneSelector.dragTo(this.dropZoneSelector);
    await this.verifyStateOfDropZone(
      this.dropColor,
      this.dropText,
      this.dropZoneSelector
    );
  }

  /**
   * Drag and drop element using manual move methods and
   * verify drop zone color and text before, on hover, and after the action is performed
   */
  public async dragAndDropUsingManualMove(
    tab: string,
    elToDragOrDrop?: string
  ): Promise<void> {
    await this.selectTab(tab, elToDragOrDrop);
    await this.verifyStateOfDropZone(
      this.defaultColor,
      this.defaultText,
      this.dropZoneSelector
    );
    await this.dragZoneSelector.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(37, 13);
    await expect(this.dropZoneSelector).toHaveCSS(
      "background-color",
      this.onMoveColor
    );
    await this.dropZoneSelector.hover();
    await expect(this.dropZoneSelector).toHaveCSS(
      "background-color",
      this.onHoverColor
    );
    await this.page.mouse.up();
    await this.verifyStateOfDropZone(
      this.dropColor,
      this.dropText,
      this.dropZoneSelector
    );
  }
}
