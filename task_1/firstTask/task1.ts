export class RegisterForm {
    email: string;
    password: string;
    username: string;
    age: number;
    termsAgreement: boolean;
    registered: boolean;

    constructor() {
        this.email = '';
        this.password = '';
        this.username = '';
        this.age = 0;
        this.termsAgreement = false;
        this.registered = false;
    }

    setEmail(email: string): void {
        let emailRegExp: RegExp = new RegExp(
            /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        );
        let userEmail = emailRegExp.test(email);
        if (userEmail) {
            this.email = email;
        } else {
            console.log('Invalid email address entered');
        }
    }
    setPassword(password: string): void {
        if (
            password.length >= 8 &&
            /[0-9]/.test(password) &&
            !/\s/.test(password)
        ) {
            this.password = password;
        } else {
            console.log(
                'Password must be at least 8 characters long and contain at least one digit'
            );
        }
    }
    setUsername(username: string): void {
        if (username !== '') {
            this.username = username;
        } else {
            console.log('Username cannot be empty');
        }
    }
    setAge(age: number): void {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            console.log('Age must be between 0 and 150');
        }
    }
    setAgreeWithTerms(terms: boolean): void {
        if (terms) {
            this.termsAgreement = terms;
        } else {
            console.log('You should accept the terms of use');
        }
    }
    setRegister(): string {
        if (
            this.email &&
            this.password &&
            this.username &&
            this.age &&
            this.termsAgreement
        ) {
            this.registered = true;
            return `User successfully registered at ${new Date().toLocaleString()}`;
        } else {
            let errorMessage = `You were not registered.`;
            if (!this.email) errorMessage += ' Email is required.';
            if (!this.password) errorMessage += ' Password is required.';
            if (!this.username) errorMessage += ' Username is required.';
            if (this.age === 0) errorMessage += ' Age is required.';
            if (this.termsAgreement === false)
                errorMessage += ' Terms of use are required.';
            return errorMessage;
        }
    }
}
