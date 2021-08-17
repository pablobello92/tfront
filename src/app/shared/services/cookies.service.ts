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

    public isLogged(): boolean {
        return this._cookies.check('logged');
    }

    public isSuperAdmin(): boolean {
        return (this._cookies.get('level') === '0');
    }

    public isAdmin(): boolean {
        return (this._cookies.get('level') === '1');
    }

    public isRegular(): boolean {
        return (this._cookies.get('level') === '2');
    }

    public getCookie(key: string): string {
        return this._cookies.get( key);
    }

    // TODO: expiración!! (el tercer parametro "1" creo que es la expiracion en semanas)
    public setCookie(key: string, value: string): void {
        this._cookies.set(key, value, 1);
    }

    public deleteCookie(key: string): void {
        this._cookies.delete(key);
    }

    public setAllCookies(res: any): void {
        this._cookies.set('logged', 'true');
        this._cookies.set('userId', res.id);
        this._cookies.set('username', res.username);
        this._cookies.set('nickname', res.nickname);
        this._cookies.set('level', res.level);
    }

    public deleteAllCookies(): void {
        this._cookies.delete('logged');
        this._cookies.delete('userId');
        this._cookies.delete('username');
        this._cookies.delete('nickname');
        this._cookies.delete('level');
    }

}
