import {test as it} from '@playwright/test'
import { DragAndDrop } from '../../page_object/LambdaTest/DragAndDrop';
it.describe('DRAG AND DROP PAGE', () => {
    // beforeEach(() => {

    // });
    it('drag and drop demo 1', async ({page}) => {
        const dragAndDrop = new DragAndDrop(page)
        await dragAndDrop.open();
        await dragAndDrop.dragAndDropElement('Draggable 1')
        await dragAndDrop.dragAndDropElement('Draggable 2')    
        
        await page.reload();
        await dragAndDrop.dragAndDropElementManually('Draggable 1')
        await dragAndDrop.dragAndDropElementManually('Draggable 2')  
        await page.pause()
    });

    it.only('drag and drop demo 2', async ({page}) => {
        const dragAndDrop = new DragAndDrop(page)
        await dragAndDrop.open();
        await dragAndDrop.dragAndDropElementDemo2()
        await page.reload();
        await dragAndDrop.dragAndDropElementDemo2Manually()     
        await page.pause()
    });
});