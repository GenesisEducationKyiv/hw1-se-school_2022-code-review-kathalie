import {emailServiceForTesting} from '../api/email-service.js';

describe('Testing functions for emails validation', () => {
    const validation = emailServiceForTesting.isEmailValid;

    it('should not pass invalid emails', () => {
        const invalidEmails = {
            noDomain: 'no-reply@',
            noDomainAndAtSign: 'no-reply',
            onlyDomain: 'example.com',
            onlyMultiDotDomain: 'example.com.ua',
            onlyDomainAndAtSign: '@example.com.ua',
            unsupportedSymbols: 'no$reply@example.com',
            atSignAndDotInARow: 'no-reply@.com',
            incorrectDomain: 'no-reply@com',
            onlyDot: '.',
            onlyAtSign: '@',
            emptyString: ''
        }

        let resultsOfValidation = {};
        for (const key in invalidEmails) {
            resultsOfValidation[key] = validation(invalidEmails[key]);
        }

        for (const key in invalidEmails) {
            expect(resultsOfValidation[key]).toBeFalsy();
        }
    });

    it('should pass valid emails', () => {
        const validEmails = {
            twoDotDomain: 'no-reply@example.com.ua',
            oneDotDomain: 'no-reply@example.com',
            emailWithoutDash: 'noreply@example.com',
            emailWithUnderscore: 'no_reply@example.com.ua',
        }

        let resultsOfValidation = {};
        for (const key in validEmails) {
            resultsOfValidation[key] = validation(validEmails[key]);
        }

        for (const key in validEmails) {
            expect(resultsOfValidation[key]).toBeTruthy();
        }
    })
});