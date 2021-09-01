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
    SERVER,
    SUMARIZATION_TYPES_VALUE
} from '../../../app/configs/app.config';
import {
    ISumarization
} from '../interfaces/Track';

@Injectable()
export class SumarizationsService {

    constructor(
        private http: HttpClient
    ) {}

    public getSumarizationsByCity(cityId: number, type: SUMARIZATION_TYPES_VALUE): Observable <ISumarization> {
        const params = '?cityId=' + cityId + '&type=' + type;
        const endpoint = SERVER + ENDPOINTS.sumarizations.get + params;
        return <Observable<ISumarization>>this.http.get(endpoint);
    }

    public executeSumarization(payload: any): Observable <any> {
        const endpoint = SERVER + ENDPOINTS.sumarizations.index;
        return <Observable <any>> this.http.post(endpoint, payload);
    }

    public executePrediction(payload: any): Observable < any > {
        const endpoint = SERVER + ENDPOINTS.predictions;
        return <Observable < any >> this.http.post(endpoint, payload);
    }
}
