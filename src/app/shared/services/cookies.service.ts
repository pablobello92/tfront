import {
    Injectable
} from '@angular/core';
import {
    CookieService
} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class CookiesService {

    constructor(
        private _cookies: CookieService
    ) {}

    public setLoginCookies(res: any): void {
        this._cookies.set('logged', 'true');
        this._cookies.set('username', res.username);
        this._cookies.set('nickname', res.nickname);
        this._cookies.set('userLevel', res.userLevel);
    }

    public deleteAllCookies(): void {
        this._cookies.deleteAll();
    }

    public isLogged(): boolean {
        return this._cookies.check('logged');
    }

    public isAdmin(): boolean {
        return (this._cookies.get('userLevel') === '0');
    }

    public setCookie(key: string, value: string): void {
        this._cookies.set(key, value, 1);
    }

    public getCookie(key: string): string {
        return this._cookies.get( key);
    }

    removeUserDataField(key: string): void {
        this._cookies.delete(key);
    }

}
