import { userToken } from './credentialsData';

export function logIn() {
    cy.setCookie('logged_in', '1', {
        domain: '.onliner.by',
        secure: true,
        sameSite: 'lax',
    });
    cy.setCookie('oss', userToken, {
        domain: '.onliner.by',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });
    cy.visit('/');
}
