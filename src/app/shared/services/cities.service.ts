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
    City
} from '../interfaces/City';
import {
    ENDPOINTS,
    SERVER
} from '../constants/constants';

@Injectable()
export class CitiesService {

    constructor(
        private http: HttpClient
    ) {}

    getCities(): Observable<City[]> {
        const endpoint = SERVER + ENDPOINTS.cities.get;
        return <Observable<City[]>>this.http.get(endpoint);
    }
}
