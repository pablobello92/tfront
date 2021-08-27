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
    ENDPOINTS,
    SERVER
} from '../../../app/configs/app.config';
import {
    ISumarization
} from '../interfaces/Track';

@Injectable()
export class SumarizationsService {

    constructor(
        private http: HttpClient
    ) {}

    public getSumarizationsByCity(cityId: number): Observable < any > {
        const params = '?cityId=' + cityId ;
        const endpoint = SERVER + ENDPOINTS.sumarizations.get + params;
        return <Observable<ISumarization>>this.http.get(endpoint);
    }

    public sumarizeTracks(payload: any): Observable < any > {
        const endpoint = SERVER + ENDPOINTS.sumarizations.index;
        return <Observable < any >> this.http.post(endpoint, payload);
    }
}
