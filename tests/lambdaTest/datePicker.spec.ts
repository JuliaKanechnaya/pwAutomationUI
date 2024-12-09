import {test as it} from '@playwright/test'
import { DatePicker } from '../../page_object/LambdaTest/DatePicker';

it.describe('DATE PICKER PAGE', () => {
    it('should have a header', async ({page}) => {
        const datePicker = new DatePicker(page)
        await datePicker.open();
        await datePicker.verifyHeader();
    });
    
});