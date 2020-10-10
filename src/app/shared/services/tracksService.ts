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
    catchError,
    tap
} from 'rxjs/operators';
import { Track } from '../interfaces/Track';
import { Range } from '../interfaces/Range';

@Injectable()
export class TracksService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    getTracks(userName: string, city: string): Observable<Range[]> {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.getTracks + '?username=' + userName + '&city=' + city;
        return <Observable<Range[]>>this.http.get(endpoint);
    }
}
