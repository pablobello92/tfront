import {
    Injectable
} from '@angular/core';
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
import {
    ENDPOINTS,
    SERVER
} from '../constants/constants';

@Injectable()
export class UsersService {

    constructor(
        private http: HttpClient
    ) {}

    public getUser(userName: string): Observable<User> {
        const endpoint = SERVER + ENDPOINTS.users.get + '?username=' + userName;
        return <Observable < User >> this.http.get(endpoint);
    }

    public updateUser(body: any): Observable<any> {
        const endpoint = SERVER + ENDPOINTS.users.update;
        return <Observable < any >> this.http.put(endpoint, body)
            .pipe(catchError((err, caught) => new Observable(err)));
    }

    public loginUser(username: string, password: string): Observable<User> {
        const endpoint = SERVER + ENDPOINTS.login;
        const payload = {
            username,
            password
        };
        return <Observable<User>> this.http.post(endpoint, payload);
    }
}
