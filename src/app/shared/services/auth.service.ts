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
    of
} from 'rxjs/internal/observable/of';
import {
    tap
} from 'rxjs/operators';
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

    public login(): Observable < any > {
        const endpoint = this._config.server + this._config.endpoints.login;
        /*const payload = {
            email,
            password
        };*/
        this._cookies.set('logged', 'true');
        return of(true);
        /*return <Observable < any >> this._http.post(endpoint, payload)
        .pipe(
            tap(res => {
                this._cookies.set('logged', 'true');
            })
        );*/
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
    public setUserDataField(key: string, value: string): void {
        this._cookies.set('user.' + key, value);
    }

    public getUserDataField(key: string): string {
        return this._cookies.get('user.' + key);
    }

    removeUserDataField(key: string): void {
        this._cookies.delete('user.' + key);
    }




}
