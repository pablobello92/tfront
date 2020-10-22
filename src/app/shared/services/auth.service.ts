import {
    Injectable
} from '@angular/core';
import {
    CookieService
} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private _cookies: CookieService
    ) {}
    getAllCookies(): any {
        this._cookies.getAll();
    }

    // TO-DO: expiracion de las cookies
    setUserDataField(key: string, value: string): void {
        this._cookies.set('user.' + key, value);
    }

    getUserDataField(key: string): string {
        return this._cookies.get('user.' + key);
    }

    removeAllUserData(): void {
        this.removeUserDataField('id');
        this.removeUserDataField('id_external_table');
        this.removeUserDataField('name');
        this.removeUserDataField('type');
        this.removeUserDataField('token');
    }

    removeUserDataField(key: string): void {
        this._cookies.delete('user.' + key);
    }

    isLogged(): boolean {
        return this._cookies.check('logged');
    }

    logIn(): void {
        this._cookies.set('logged', 'true');
    }

    logOut(): void {
        this._cookies.delete('logged');
        this.removeAllUserData();
    }
}
