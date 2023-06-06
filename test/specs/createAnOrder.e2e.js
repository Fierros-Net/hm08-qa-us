const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('Sets the address', async () => {
        await page.setURLAddress();
        //begin expect checks
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    })

    it('Selects the supportive option', async () => {
        await page.setURLAddress();
        const tariffSelectiion = await $(page.tariffSelectiion);
        await page.selectSupportiveTariff();
        await expect(tariffSelectiion).toBeDisplayed();
    })

    it('Enter the phone number', async () => {
        await page.setURLAddress();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('Adds a credit card', async () => {
        await page.setURLAddress();
        await page.openCreditCard();
        const addCreditCardModal = await $(page.addCreditCardModal);
        const creditCardField = await $(page.creditCardField);
        const creditCardCVC = await $(page.creditCardCVC);
        await expect(addCreditCardModal).toBeDisplayed();
        await page.fillCreditCard('1234 5678 9101', '69');
        await expect(creditCardField).toHaveValue('1234 5678 9101');
        await expect(creditCardCVC).toHaveValue('69');
        const closeButton = await $(page.closeButton);
        await closeButton.click();
    })

    it('Writes a message to the driver', async () => {
        await page.setURLAddress();
        await page.writeMessage('Message to driver');
        const messageButton = await $(page.messageButton);
        await expect(messageButton).toHaveValue('Message to driver');
    })

    it('Toggle Blankets and handkerchiefs', async () => {
        await page.setURLAddress();
        await page.selectSupportiveTariff();
        await page.openOrderRequirements();
        const blanketAndHankey = await $(page.blanketAndHankey);
        const isCheckboxChecked = await blanketAndHankey.isSelected();

        if (isCheckboxChecked) {
            console.log("The checkbox is checked");
        } else {
            console.log("The checkbox is not checked");
        }
    })


    it('Should order 2 ice creams', async () => {
        await page.setURLAddress();
        await page.selectSupportiveTariff();
        const iceCreamToggle = await $(page.iceCreamToggle);
        await page.orderIceCream();
        await page.orderIceCream();
        await expect(iceCreamToggle).toHaveElementClass('disabled');
    })

    it('Should open car search modal', async () => {
        await page.setURLAddress();
        await page.selectSupportiveTariff();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.openCreditCard();
        await page.fillCreditCard('1234 5000 4560', '50');
        const closeButton = await $(page.closeButton);
        await closeButton.click();
        await page.writeMessage('Message to driver');
        await page.openOrderRequirements();
        await page.orderIceCream();
        await page.orderIceCream();
        const carOrderModal = await $(page.carOrderModal);
        await page.carSearch();
        await expect(carOrderModal).toBeDisplayed();
    })

    it('Should wait for driver info to appear', async () => {
        await page.setURLAddress();
        await page.selectSupportiveTariff();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.openCreditCard();
        await page.fillCreditCard('1234 5000 4560', '50');
        const closeButton = await $(page.closeButton);
        await closeButton.click();
        await page.writeMessage('Message to driver');
        await page.openOrderRequirements();
        await page.orderIceCream();
        await page.orderIceCream();
        await page.carSearch();
        const driverInfo = await $(page.driverInfo);
        await driverInfo.waitForExist({ timeout: 5000 });
        const driverPhoto = await $(page.driverPhoto);
        await expect(driverPhoto).toBeDisplayed();
    })

})