import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private iss = {
        login: 'http://elearn-fyp2.herokuapp.com/api/login'
        // signup: 'https://elearn-fyp2.herokuapp.com/api/signup'
    };


    constructor() {
    }

    tokenHandler(token) {
        this.set(token);
        console.log(this.isValid());
    }

    setUserTokenHandler(userToken) {
        localStorage.setItem('authUser', JSON.stringify(userToken));
    }

    getUserTokenHandler() {
        return JSON.parse(localStorage.getItem('authUser'));
    }

    loggedIn() {

        return this.isValid();
    }

    set(token) {
        localStorage.setItem('token', token);
    }

    get(token) {
        return localStorage.getItem(token);
    }

    remove() {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
    }

    isValid() {
        const token = this.get('token');
        console.log('Getting token******', token);
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                console.log('index of payload.iss', Object.values(this.iss).indexOf(payload.iss));
                return (Object.values(this.iss).indexOf(payload.iss) > -1);
            }
        }

        return false;

    }

    payload(token) {
        const payload = token.split('.')[1];
        console.log('payload:', payload);
        return this.decode(payload);
    }

    decode(payload) {
        console.log('after decode:', JSON.parse(atob(payload)));
        return JSON.parse(atob(payload));
    }


}
