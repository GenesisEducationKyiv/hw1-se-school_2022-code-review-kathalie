import {emailService as configEmailService} from '../../app-config';

describe('Testing functions for emails validation', () => {
    const emailService = configEmailService;
    const emailServicePrototype = Object.getPrototypeOf(emailService);
    const validate = emailServicePrototype.isEmailValid;

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
            resultsOfValidation[key] = validate(invalidEmails[key]);
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
            emailWithNumbers: 'noreply123@example1.com.ua'
        }

        let resultsOfValidation = {};
        for (const key in validEmails) {
            resultsOfValidation[key] = validate(validEmails[key]);
        }

        for (const key in validEmails) {
            expect(resultsOfValidation[key]).toBeTruthy();
        }
    });
});