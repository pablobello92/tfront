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
    Observable
} from 'rxjs';
import {
    catchError
} from 'rxjs/operators';
import {
    User
} from '../interfaces/User';

@Injectable()
export class UsersService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    getUser(userName: string): Observable < User > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.users.get + '?username=' + userName;
        return <Observable < User >> this.http.get(endpoint);
    }

    updateUser(body: any): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.users.update;
        return <Observable < any >> this.http.put(endpoint, body)
            .pipe(catchError((err, caught) => new Observable(err)));
    }

    public loginUser(username: string, password: string): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.login;
        const payload = {
            username,
            password
        };
        return <Observable < any >> this.http.post(endpoint, payload);
    }
}
