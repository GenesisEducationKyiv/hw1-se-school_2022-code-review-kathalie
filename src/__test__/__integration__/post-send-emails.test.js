// describe('POST /sendEmails', () => {
//     const sendEmailsEndpoint = '/api/sendEmails';
//
//     beforeAll(() => {
//         const testingEmails = [
//             'kathrine312003@gmail.com',
//             'verkhogliadkate@gmail.com',
//         ];
//         for (const email of testingEmails) {
//             const successfullySent = subscriptionsManager.addSubscriber(email);
//
//             console.log(successfullySent ? 'Successfully subscribed ' : 'Failed to subscribe ' + email);
//         }
//     });
//
//     afterAll(() => {
//
//     });
//
//     it ('should ', async() => {
//         const response = await request(app).post(sendEmailsEndpoint);
//     });
// });