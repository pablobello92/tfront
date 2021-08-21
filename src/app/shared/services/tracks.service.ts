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
    Track
} from '../interfaces/Track';
import {
    MapFilter
} from '../interfaces/MapFilter';
import {
    ENDPOINTS,
    SERVER
} from '../../../app/configs/app.config';

@Injectable()
export class TracksService {

    constructor(
        private http: HttpClient
    ) {}

    public getAllTracks(): Observable < Track[] > {
        const endpoint = SERVER + ENDPOINTS.tracks.get;
        return <Observable < Track[] >> this.http.get(endpoint);
    }

    public getUserTracks(filterObject: MapFilter): Observable < Track[] > {
        const params = '?userId=' + filterObject.userId + '&cityId=' + filterObject.cityId
        + '&offset=' + filterObject.offset + '&pages=' + filterObject.pages
        + '&from=' + filterObject.startTime.from + '&to=' + filterObject.startTime.to;
        const endpoint = SERVER + ENDPOINTS.tracks.get + params;
        return <Observable < Track[] >> this.http.get(endpoint);
    }

    public executePrediction(payload: any): Observable < any > {
        const endpoint = SERVER + ENDPOINTS.predictions;
        return <Observable < any >> this.http.post(endpoint, payload);
    }
}
