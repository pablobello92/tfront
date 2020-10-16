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

    //TODO: move to loginService
    //?Probably doing some researching before... To avoid wasting work hours
    login(): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.login;
        return <Observable<any>>this.http.get(endpoint, {});
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
