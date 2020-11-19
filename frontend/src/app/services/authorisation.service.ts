import { Injectable } from '@angular/core';

@Injectable()
export class AuthorisationService {

    constructor() {
    }

    hasAccess(roles) {
        if (localStorage.getItem('currentUser') && roles) {
            for (let index = 0; index < roles.length; index++) {
                if (JSON.parse(localStorage.getItem('currentUser')).role === roles[index]) {
                    return true;
                }
            }
        }
    }
}
