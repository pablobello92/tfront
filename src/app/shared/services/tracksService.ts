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

    getTrack(userName: string): Observable<Track> | Observable<any> {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.get + '?username=' + userName;
        return this.http.get(endpoint)
        .pipe(catchError((err, caught) => new Observable(err)));
    }

    getTracks(userName: string): Observable<Range[]> {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.getTracks + '?username=' + userName;
        return <Observable<Range[]>>this.http.get(endpoint);
    }
}
