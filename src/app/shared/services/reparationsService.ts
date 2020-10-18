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
import { Reparation } from '../interfaces/Reparation';

@Injectable()
export class ReparationsService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}

    public getReparations(city: string): Observable < Reparation[] > {
        const params = '?city=' + city ;
        const endpoint = this.appConfig.server + this.appConfig.endpoints.reparations.get + params;
        return <Observable < Reparation[] >> this.http.get(endpoint);
    }

    public insertReparation(rep: Reparation): Observable<any> {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.reparations.insert;
        return <Observable<any>> this.http.put(endpoint, rep);
    }
}
