import {
    Injectable
} from '@angular/core';
import {
    CookieService
} from 'ngx-cookie-service';
import {
    Observable
} from 'rxjs';
import {
    AppConfig
} from '../../configs/app.config';
import {
    HttpClient
} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private _config: AppConfig,
        private _http: HttpClient,
        private _cookies: CookieService
    ) {}

    public login(username: string, password: string): Observable < any > {
        const endpoint = this._config.server + this._config.endpoints.login;
        const payload = {
            username,
            password
        };
        return <Observable < any >> this._http.post(endpoint, payload);
    }

    public logout(): void {
        this._cookies.delete('logged');
        this._cookies.delete('name');
    }

    public isLogged(): boolean {
        return this._cookies.check('logged');
    }

    public isAdmin(): boolean {
        return true;
    }

    // TO-DO: expiracion de las cookies
    public setCookie(key: string, value: string): void {
        this._cookies.set(key, value);
    }

    public getCookie(key: string): string {
        return this._cookies.get( key);
    }

    removeUserDataField(key: string): void {
        this._cookies.delete(key);
    }




}
