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
import { City } from '../interfaces/City';

@Injectable()
export class CitiesService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig
    ) {}


    /**
     * TODO: pipe() y le agregamos zoom...
     */
    getCities(): Observable<City[]> {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.cities.get;
        return <Observable<City[]>>this.http.get(endpoint)
        .pipe(
            map((cities: City[]) => {
                return cities.map((city: City) => {
                    city.zoom = 13;
                    return city;
                });
            })
        );
    }
}
