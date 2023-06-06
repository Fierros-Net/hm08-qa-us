module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardField: '#number.card-input',
    creditCardCVC: '#code.card-input',
    // Buttons
    //Address and phone number modals
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    // Buttons related to payment modal
    confirmButton: 'button=Confirm',
    linkButton: 'button=Link',
    closeButton: '(//button[@class="close-button section-close"])[3]',
    creditCardButton: '.pp-text',
    addCreditCardButton: '//div[starts-with(text(), "Add card")]',
    // Add message to driver
    messageButton: '//*[@id="comment"]',
    //Main order button
    orderButton: '.smart-button',
    // Supportive button
    tariffSelectiion: '//div[starts-with(text(), "Supportive")]',
    orderReqToggle: '//div[@class="reqs open"]',
    iceCreamToggle: '.counter-plus',
    blanketAndHankey: '(//div[@class="r-sw-container"])[1]',
    // Modals
    phoneNumberModal: '.modal',
    addCreditCardModal: '.card-wrapper',
    carOrderModal: ".order-body",
    driverInfo: ".order-subbody",
    driverPhoto: "(//img[@alt='close'])[1]",

    // Functions
    fillAddresses: async function (from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },

    fillPhoneNumber: async function (phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },

    submitPhoneNumber: async function (phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        const codeField = await $(this.codeField);
        await codeField.waitForDisplayed();
        await browser.waitUntil(async () => {
            const requests = await browser.getRequests();
            return requests.length === 1;
        });

        const requests = await browser.getRequests();
        const code = requests[0].response.body.code;
        await codeField.setValue(code);
        const confirmButton = await $(this.confirmButton);
        await confirmButton.click();
    },

    setURLAddress: async function () {
        //for easier address and filling
        await browser.url('/');
        await this.fillAddresses('East 2nd Street, 601', '1300 1st St');
    },

    openCreditCard: async function () {
        const creditCardButton = await $(this.creditCardButton);
        await creditCardButton.waitForDisplayed();
        await creditCardButton.click();
        const addCreditCardButton = await $(this.addCreditCardButton);
        await addCreditCardButton.waitForDisplayed();
        await addCreditCardButton.click();
        const addCreditCardModal = await $(this.addCreditCardModal);
        await addCreditCardModal.waitForDisplayed();
    },

    fillCreditCard: async function (creditCard, cvc) {

        const creditCardField = await $(this.creditCardField);
        await creditCardField.waitForDisplayed();
        await creditCardField.setValue(creditCard);
        const creditCardCVC = await $(this.creditCardCVC);
        await creditCardCVC.waitForDisplayed();
        await creditCardCVC.setValue(cvc);
        await creditCardField.click();
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
    },

    writeMessage: async function (message) {
        //to enter a message
        const messageButton = await $(this.messageButton);
        await messageButton.waitForDisplayed();
        await messageButton.setValue(message);
    },

    openOrderRequirements: async function () {
        //easier toggle
        const orderReqToggle = await $(this.orderReqToggle);
        await orderReqToggle.waitForDisplayed();
    },

    orderIceCream: async function () {
        //shortcut to ice cream
        const iceCreamToggle = await $(this.iceCreamToggle);
        await iceCreamToggle.click();
    },

    carSearch: async function () {
        const orderButton = await $(this.orderButton);
        await orderButton.click();
        const carOrderModal = await $(this.carOrderModal);
        await carOrderModal.waitForDisplayed();
    },

    selectSupportiveTariff: async function () {
        //for easier selection of Supportive
        const tariffSelectiion = await $(this.tariffSelectiion);
        await tariffSelectiion.click();
    },

};