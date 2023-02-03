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

    private keys: string[] = [
        'id',
        'username',
        'nickname',
        'level',
        'linkedCities'
    ];

    constructor(
        private _cookies: CookieService
    ) {}

    public isLogged(): boolean {
        return this._cookies.check('id');
    }

    public isSuperAdmin(): boolean {
        return (this._cookies.get('level') === '0');
    }

    public isAdmin(): boolean {
        return (this._cookies.get('level') === '1');
    }

    public hasAdminLevel(): boolean {
        return (this.isAdmin() || this.isSuperAdmin());
    }

    public isRegularUser(): boolean {
        return (this._cookies.get('level') === '2');
    }

    public getCookie(key: string): string {
        return this._cookies.get( key);
    }

    public setCookie(key: string, value: string): void {
        this._cookies.set(key, value, 1);
    }

    public deleteCookie(key: string): void {
        this._cookies.delete(key);
    }

    public setAllCookies(res: any): void {
        this.keys.forEach((key: string) => {
            if(typeof(res[key]) !== 'string') {
                this._cookies.set(key, JSON.stringify(res[key]));
            } else {
                this._cookies.set(key, res[key]);
            }
        });
    }

    public deleteAllCookies(): void {
        this.keys.forEach((key: string) => {
            this._cookies.delete(key);
        });
    }

}
