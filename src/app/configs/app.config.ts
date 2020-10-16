import {
    Injectable
} from '@angular/core';
import {
    environment
} from '../../environments/environment';


@Injectable()
export class AppConfig {

    server = environment.uri;

    endpoints = {
        'cities': {
            'get': 'cities/'
        },
        'predictions': {
            'anomalies': 'predictions/anomalies',
            'roadTypes': 'predictions/roadTypes'
        },
        'reparations': 'reparations',
        'tracks': {
            'get': 'tracks',
            'sumarize': 'tracks/sumarize'
        },
        'users': {
            'get': 'users/',
            'update': 'users/update/'
        },
        'login': 'login'
    };
}
