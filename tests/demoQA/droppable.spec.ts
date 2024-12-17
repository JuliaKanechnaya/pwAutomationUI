import {test as it} from '@playwright/test'
import { Droppable } from '../../page_object/DemoQA/Interractions/Droppable';

it.describe('DRAG AND DROP PAGE', () => {
    it('Drag and drop - Simple tab', async ({page}) => {
        const droppable = new Droppable(page);
        await droppable.open();
        await droppable.dragAndDropUsingDragTo('Simple');
        await page.reload();
        await droppable.dragAndDropUsingManualMove('Simple');
        // await page.pause();
    });

    it('Drag and drop - Accept tab', async ({page}) => {
        const droppable = new Droppable(page);
        await droppable.open();
        await droppable.dragAndDropUsingDragTo('Accept', 'Acceptable');
        await page.reload();
        await droppable.dragAndDropUsingManualMove('Accept', 'Acceptable');
        await page.reload();
        await droppable.dragAndDropUsingDragTo('Accept', ' not Acceptable');
        await page.reload();
        await droppable.dragAndDropUsingManualMove('Accept', 'not Acceptable');
        await page.reload();
        // await page.pause();
    });

    it('Drag and drop - Revert Draggable tab', async ({page}) => {
        const droppable = new Droppable(page);
        await droppable.open();
        await droppable.dragAndDropUsingDragTo('Revert Draggable', 'Not revert');
        await page.reload();
        await droppable.dragAndDropUsingManualMove('Revert Draggable', 'not revert');
        await page.reload();
        await droppable.dragAndDropUsingDragTo('Revert Draggable', 'will revert');
        await page.reload();
        await droppable.dragAndDropUsingManualMove('Revert Draggable', 'Will revert');
        // await page.pause();
    });
    it('Drag and drop - Prevent Propogation tab', async ({page}) => {
        const droppable = new Droppable(page);
        await droppable.open();
        await droppable.dragAndDropUsingDragTo('Prevent Propogation', 'outer droppable (not greedy)');
        await page.reload();
        await droppable.dragAndDropUsingDragTo('Prevent Propogation', 'inner droppable (not greedy)');
        await page.reload();
                // await droppable.dragAndDropUsingDragTo('Prevent Propogation', 'outer droppable (greedy)');
                // await page.reload();
        await droppable.dragAndDropUsingDragTo('Prevent Propogation', 'inner droppable (greedy)');
        await page.reload();

        await droppable.dragAndDropUsingManualMove('Prevent Propogation', 'outer droppable (not greedy)');        
        await page.reload();
        await droppable.dragAndDropUsingManualMove('Prevent Propogation', 'inner droppable (not greedy)');
        await page.reload();
            //   await droppable.dragAndDropUsingManualMove('Prevent Propogation', 'outer droppable (greedy)');
        // await page.pause();
        await page.reload();
        await droppable.dragAndDropUsingManualMove('Prevent Propogation', 'inner droppable (greedy)');

        // await page.pause();
    });
});