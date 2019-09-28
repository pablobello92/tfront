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
import {
    isUndefined
} from 'util';

@Injectable()
export class ProvidersService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    /*getProvider(id: string): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.provider.get;
        const params = '?id=' + id;
        const url = endpoint + params;
        return this.http.get(url);
    }

    setProvider(id: string, providerData: object): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.provider.set;
        providerData['id'] = Number.parseInt(id);
        return this.http.post(endpoint, providerData)
            .pipe(map(res => {
                return res;
            }), catchError((err, caught) => {
                return new Observable(err);
            }));
    }

    doTest(): Observable < any > {
        const endpoint = this.appConfig.server + '/api/test';
        console.log(endpoint);
        return this.http.get(endpoint)
            .pipe(map(res => {
                return res;
            }), catchError(err => {
                return new Observable(err);
            }));
    }*/
}
