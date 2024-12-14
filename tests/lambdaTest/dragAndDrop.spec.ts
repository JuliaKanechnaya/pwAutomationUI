import {test as it} from '@playwright/test'
import { DragAndDrop } from '../../page_object/LambdaTest/DragAndDrop';
it.describe('DRAG AND DROP PAGE', () => {
    // beforeEach(() => {

    // });
    it('drag and drop demo 1 with dragTo', async ({page}) => {
        const dragAndDrop = new DragAndDrop(page)
        const url = process.env.LAMBDA ? `${process.env.LAMBDA}/selenium-playground/drag-and-drop-demo` : 'https://www.lambdatest.com/selenium-playground/drag-and-drop-demo'
        await page.goto(url)
        await dragAndDrop.dragAndDropElement('Draggable 1')
        await dragAndDrop.dragAndDropElement('Draggable 2')    
        
        await page.reload();
        await dragAndDrop.dragAndDropElementManually('Draggable 1')
        await dragAndDrop.dragAndDropElementManually('Draggable 2')  
        await page.pause()
    });

    it('drag and drop demo 1 with manual option', async ({page}) => {
        const dragAndDrop = new DragAndDrop(page)
        const url = process.env.LAMBDA ? `${process.env.LAMBDA}selenium-playground/drag-and-drop-demo` : 'https://www.lambdatest.com/selenium-playground/drag-and-drop-demo'
        await page.goto(url)
        await dragAndDrop.dragAndDropElementManually('Draggable 1')
        await dragAndDrop.dragAndDropElementManually('Draggable 2')     
        await page.pause()
    });
});