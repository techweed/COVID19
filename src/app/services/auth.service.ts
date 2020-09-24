import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    constructor() {}

    // authenticateUser(username: string, password: string): Observable<any[]> {
    //    // call API to authenticate user
    //    // set the token in localstorage
    //    localStorage.setItem('access_token', "jwt_token");
    // }
    
    logout(){
      localStorage.removeItem('access_token');
    }

    isAuthenticated() {
        // get the auth token from localStorage
        let token = localStorage.getItem('access_token');
        if (token) {
            return true;
        }
        return false;

    }


}
