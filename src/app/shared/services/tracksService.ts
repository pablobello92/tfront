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
export class TracksService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    getTracks(userName: any): Observable <any> {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.get + '?username=' + userName;
        return this.http.get(endpoint)
        .pipe(map(user => {
            return user;
        }), catchError((err, caught) => {
            return new Observable(err);
        }));
    }
}
