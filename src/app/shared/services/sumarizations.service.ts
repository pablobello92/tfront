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
        let endpoint: string = SERVER;
        let params = '?cityId=' + cityId;
        if (type === SUMARIZATION_TYPES_VALUE.PREDICTION_ANOMALIES || type === SUMARIZATION_TYPES_VALUE.PREDICTION_ROADS) {
            params += '&type=' + type;
            endpoint += ENDPOINTS.predictions + params;
        } else {
            endpoint += ENDPOINTS.sumarizations.get + params;
        }
        return <Observable<ISumarization>>this.http.get(endpoint);
    }

    public sumarizeTracks(payload: any): Observable <any> {
        const endpoint = SERVER + ENDPOINTS.sumarizations.index;
        return <Observable <any>> this.http.post(endpoint, payload);
    }
}
