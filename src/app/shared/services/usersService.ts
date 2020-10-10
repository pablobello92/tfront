import {
    Injectable
} from '@angular/core';
import {
    AppConfig
} from '../../configs/app.config';
import {
    HttpClient
} from '@angular/common/http';
import {
    Observable,
    empty
} from 'rxjs';
import {
    map,
    catchError
} from 'rxjs/operators';

@Injectable()
export class UsersService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    login(username: string, pass: string): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.users.login;
        return this.http.post(endpoint, {
                username: username,
                password: pass
            })
            .pipe(map(user => {
                return user;
            }), catchError((err, caught) => {
                return new Observable(err);
            }));
    }

    getUser(userName: any): Observable < any > { // TODO: wrappear en elemento mas completo, con STATUS, etc
        const endpoint = this.appConfig.server + this.appConfig.endpoints.users.get + '?username=' + userName;
        return this.http.get(endpoint)
        .pipe(map(user => {
            return user;
        }), catchError((err, caught) => {
            return new Observable(err);
        }));
    }
}
