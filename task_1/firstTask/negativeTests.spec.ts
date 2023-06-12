import { RegisterForm } from './task1';

describe('Negative tests for register form', () => {
    let registerTest: RegisterForm;
    beforeEach(() => {
        registerTest = new RegisterForm();
    });
    
    test("Test_1: Email doesn't contain @", () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setEmail('testemailgmail.com');
        expect(spy).toHaveBeenCalledWith('Invalid email address entered');
    });
    test("Test_2: Email doesn't contain first level domain", () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setEmail('testemail@gmail.');
        expect(spy).toHaveBeenCalledWith('Invalid email address entered');
    });
    test('Test_3: Enter empty email', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setEmail('');
        expect(spy).toHaveBeenCalledWith('Invalid email address entered');
    });
    test('Test_4: Password is less than 8 symbols', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setPassword('qwerty1');
        expect(spy).toHaveBeenCalledWith(
            'Password must be at least 8 characters long and contain at least one digit'
        );
    });
    test("Test_5: Password doesn't contain digit", () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setPassword('qwertyRTY');
        expect(spy).toHaveBeenCalledWith(
            'Password must be at least 8 characters long and contain at least one digit'
        );
    });
    test('Test_6: Enter empty password', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setPassword('');
        expect(spy).toHaveBeenCalledWith(
            'Password must be at least 8 characters long and contain at least one digit'
        );
    });
    test('Test_7: Enter empty username', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setUsername('');
        expect(spy).toHaveBeenCalledWith('Username cannot be empty');
    });
    test('Test_8: Entered age is 0', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setAge(0);
        expect(spy).toHaveBeenCalledWith('Age must be between 0 and 150');
    });
    test('Test_9: Entered age is 150', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setAge(150);
        expect(spy).toHaveBeenCalledWith('Age must be between 0 and 150');
    });
    test('Test_10: Entered age is 179', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setAge(179);
        expect(spy).toHaveBeenCalledWith('Age must be between 0 and 150');
    });
    test('Test_11: Enter incorrect age', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setAge(-10);
        expect(spy).toHaveBeenCalledWith('Age must be between 0 and 150');
    });
    test("Test_12: User doesn't agree with Terms of Use", () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setAgreeWithTerms(false);
        expect(spy).toHaveBeenCalledWith('You should accept the terms of use');
    });
    test('Test_13: Register user without an email', () => {
        registerTest.setEmail('');
        registerTest.setPassword('qwerty123');
        registerTest.setUsername('testName');
        registerTest.setAge(20);
        registerTest.setAgreeWithTerms(true);
        expect(registerTest.setRegister()).toBe(
            'You were not registered. Email is required.'
        );
    });
    test('Test_14: Register user without username', () => {
        registerTest.setEmail('belanlera@mail.ru');
        registerTest.setPassword('qwerty123');
        registerTest.setUsername('');
        registerTest.setAge(20);
        registerTest.setAgreeWithTerms(true);
        expect(registerTest.setRegister()).toBe(
            'You were not registered. Username is required.'
        );
    });
    test('Test_15: Register with all invalid data', () => {
        const spy = jest.spyOn(console, 'log');
        registerTest.setEmail('testemailgmail.com');
        registerTest.setPassword('qwerty');
        registerTest.setUsername('');
        registerTest.setAge(179);
        registerTest.setAgreeWithTerms(false);
        expect(spy).toHaveBeenCalledWith('Invalid email address entered');
        expect(spy).toHaveBeenCalledWith(
            'Password must be at least 8 characters long and contain at least one digit'
        );
        expect(spy).toHaveBeenCalledWith('Username cannot be empty');
        expect(spy).toHaveBeenCalledWith('Age must be between 0 and 150');
        expect(spy).toHaveBeenCalledWith('You should accept the terms of use');
    });
});