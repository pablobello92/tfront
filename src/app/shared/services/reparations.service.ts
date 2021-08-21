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
    Reparation
} from '../interfaces/Reparation';
import {
    MapFilter
} from '../interfaces/MapFilter';
import {
    ENDPOINTS,
    SERVER
} from '../../../app/configs/app.config';

@Injectable()
export class ReparationsService {

    constructor(
        private http: HttpClient
    ) {}

    public getReparations(filterObject: MapFilter): Observable < Reparation[] > {
        const params = '?cityId=' + filterObject.cityId + '&startTime=' + filterObject.startTime.from ;
        const endpoint = SERVER + ENDPOINTS.reparations.get + params;
        return <Observable < Reparation[] >> this.http.get(endpoint);
    }

    public insertReparation(rep: Reparation): Observable<any> {
        const endpoint = SERVER + ENDPOINTS.reparations.insert;
        return <Observable<any>> this.http.put(endpoint, rep);
    }
}
