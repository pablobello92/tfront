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
import { User } from '../interfaces/User';

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

    getUser(userName: string): Observable < User > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.users.get + '?username=' + userName;
        return <Observable < User >>this.http.get(endpoint);
    }

    updateUser(body: any): Observable<any> {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.users.update;
        return <Observable<any>>this.http.put(endpoint, body)
        .pipe(catchError((err, caught) => new Observable(err)));
    }
}
