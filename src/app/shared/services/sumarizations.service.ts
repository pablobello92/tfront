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

@Injectable()
export class SumarizationsService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    public getSumarizationsByCity(city: string): Observable < any > {
        const params = '?city=' + city ;
        const endpoint = this.appConfig.server + this.appConfig.endpoints.sumarizations.get + params;
        return <Observable < any >> this.http.get(endpoint);
    }

    public sumarizeTracks(): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.sumarizations.index;
        return <Observable < any >> this.http.get(endpoint);
    }
}
