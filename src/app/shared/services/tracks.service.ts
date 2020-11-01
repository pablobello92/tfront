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
    Track
} from '../interfaces/Track';
import {
    MapFilter
} from '../interfaces/MapFilter';

declare var google: any;

@Injectable()
export class TracksService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    public getAllTracks(): Observable < Track[] > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.get;
        return <Observable < Track[] >> this.http.get(endpoint);
    }

    public getUserTracks(filterObject: MapFilter): Observable < Track[] > {
        const params = '?username=' + filterObject.user + '&city=' + filterObject.city
        + '&offset=' + filterObject.offset + '&pages=' + filterObject.pages
        + '&from=' + filterObject.startTime.from + '&to=' + filterObject.startTime.to;
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.get + params;
        return <Observable < Track[] >> this.http.get(endpoint);
    }

    public executePrediction_roadTypes(): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.predictions.roadTypes;
        return <Observable < any >> this.http.get(endpoint);
    }

    private getRoadType(value: number): string {
        return (value < 0.3) ? 'Earth' :
        (value < 0.6) ? 'Asphalt' :
        (value < 0.9) ? 'Cobbles' :
        'Concrete';
    }

    private getAnomalyType(value: number): string {
        return (value < 0.3) ? 'Pothole' :
        (value < 0.6) ? 'Speed Bump' :
        'Street Gutter';
    }
}
