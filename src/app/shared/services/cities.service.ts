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
    map
} from 'rxjs/operators';
import {
    City
} from '../interfaces/City';
import {
    ENDPOINTS,
    SERVER
} from '../../../app/configs/app.config';

@Injectable()
export class CitiesService {

    constructor(
        private http: HttpClient
    ) {}

    getCities(): Observable<City[]> {
        const endpoint = SERVER + ENDPOINTS.cities.get;
        return <Observable<City[]>>this.http.get(endpoint)
        .pipe(
            map((cities: City[]) =>
                cities.map((city: City) => {
                    city.zoom = 13;
                    return city;
                })
            )
        );
    }
}
