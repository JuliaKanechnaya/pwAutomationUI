import {test as it} from '@playwright/test'
import { DatePicker } from '../../page_object/LambdaTest/DatePicker';

it.describe('DATE PICKER PAGE', () => {
    it('set random date for "From" input', async ({page}) => {
        const datePicker = new DatePicker(page)
        await datePicker.open();
        await datePicker.verifyHeader();
        await datePicker.pickDate('from');
        await datePicker.pickDate('to');
    });
});