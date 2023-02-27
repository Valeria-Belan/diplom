import { RegisterForm } from './task1';

describe('Positive tests for register form', () => {
    let registerTest: RegisterForm;

    beforeEach(() => {
        registerTest = new RegisterForm();
    });

    test('Test_1: Valid email is entered', () => {
        registerTest.setEmail('test_email@gmail.com');
        expect(registerTest.email).toBe('test_email@gmail.com');
    });
    test('Test_2: Change entered valid email into another', () => {
        registerTest.setEmail('test_email@gmail.com');
        expect(registerTest.email).toBe('test_email@gmail.com');
        registerTest.setEmail('test_email_2@gmail.com');
        expect(registerTest.email).toBe('test_email_2@gmail.com');
    });
    test('Test_3: Password contains 8 symbols', () => {
        registerTest.setPassword('qwerty12');
        expect(registerTest.password).toHaveLength(8);
    });
    test('Test_4: Password contains more than 8 symbols and at least 1 digit', () => {
        registerTest.setPassword('qWertyqwerty1');
        expect(registerTest.password).toBe('qWertyqwerty1');
    });
    test('Test_5: Username can contain uppercase letters', () => {
        registerTest.setUsername('myTESTname');
        expect(registerTest.username).toBe('myTESTname');
    });
    test('Test_6: Username can contain digits', () => {
        registerTest.setUsername('myTEST_2');
        expect(registerTest.username).toBe('myTEST_2');
    });
    test('Test_7: Etered age can be 1', () => {
        registerTest.setAge(1);
        expect(registerTest.age).toBe(1);
    });
    test('Test_8: Etered age can be 149', () => {
        registerTest.setAge(149);
        expect(registerTest.age).toBe(149);
    });
    test('Test_9: User agrees with Terms of Use', () => {
        registerTest.setAgreeWithTerms(true);
        expect(registerTest.termsAgreement).toBe(true);
    });
    test('Test_10: Register with all valid fields', () => {
        registerTest.setEmail('testemail@gmail.com');
        registerTest.setPassword('qwerty12');
        registerTest.setUsername('myTESTname');
        registerTest.setAge(149);
        registerTest.setAgreeWithTerms(true);
        expect(registerTest.setRegister()).toBe(
            `User successfully registered at ${new Date().toLocaleString()}`
        );
    });
    test('Test_11: True is returned when user registers', () => {
        registerTest.setEmail('testemail@gmail.com');
        registerTest.setPassword('qwerty12');
        registerTest.setUsername('myTESTname');
        registerTest.setAge(149);
        registerTest.setAgreeWithTerms(true);
        registerTest.setRegister();
        expect(registerTest.registered).toBe(true);
    });
    test('Test_12: Message is written in console when user registers', () => {
        registerTest.setEmail('testemail@gmail.com');
        registerTest.setPassword('qwerty12');
        registerTest.setUsername('myTESTname');
        registerTest.setAge(25);
        registerTest.setAgreeWithTerms(true);
        expect(registerTest.setRegister()).toBe(
            `User successfully registered at ${new Date().toLocaleString()}`
        );
    });
    test('Test_13: Muptiple check of email, username and Terms of Use values', () => {
        registerTest.setEmail('testemail@gmail.com');
        registerTest.setUsername('myTESTname');
        registerTest.setAgreeWithTerms(true);
        expect(registerTest.email).toEqual('testemail@gmail.com');
        expect(registerTest.username).toBe('myTESTname');
        expect(registerTest.termsAgreement).toBe(true);
    });
    test('Test_14: Muptiple check of password and age values', () => {
        registerTest.setPassword('qwerty12');
        registerTest.setAge(25);
        const passwordCondition = registerTest.password.length > 0;
        const ageConditon = registerTest.age > 0 && registerTest.age < 150;
        expect(passwordCondition).toBe(true);
        expect(ageConditon).toBe(true);
    });
    test('Test_15: Registration date testing', () => {
        registerTest.setEmail('testemail@gmail.com');
        registerTest.setPassword('qwerty12');
        registerTest.setUsername('myTESTname');
        registerTest.setAge(25);
        registerTest.setAgreeWithTerms(true);
        const realDate = `${new Date().toLocaleString()}`;
        expect(registerTest.setRegister()).toContain(realDate);
    });
});