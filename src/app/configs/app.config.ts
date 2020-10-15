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
            'get': 'reparations/getReparations',
            'put': 'reparations/'
        },
        'tracks': {
            'getUserTracks': 'tracks/getUserTracks',
            'sumarize': 'tracks/sumarize'
        },
        'users': {
            'get': 'users/',
            'login': 'users/login/',
            'update': 'users/update/'
        },
    };
}
