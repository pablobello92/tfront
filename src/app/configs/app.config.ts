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
        'reparations': {
            'get': 'reparations',
            'insert': 'reparations/insert'
        },
        'tracks': {
            'get': 'tracks',
            'sumarizations': {
                'get': 'tracks/sumarize',
                'insert': 'sumarizations/insert'
            }
        },
        'users': {
            'get': 'users',
            'update': 'users/update'
        },
        'login': 'login'
    };
}
