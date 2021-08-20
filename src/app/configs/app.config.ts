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
        cities: {
            get: 'cities'
        },
        predictions: 'predictions',
        reparations: {
            get: 'reparations',
            insert: 'reparations/insert'
        },
        tracks: {
            get: 'tracks'
        },
        sumarizations: {
            index: 'sumarizations',
            get: 'sumarizations/get'
        },
        users: {
            get: 'users',
            update: 'users/update'
        },
        login: 'login'
    };

    roadColors = {
        noEvent: '#00ffff', // cyan
        veryLow: '#00ff00', // green
        low: '#ffff00', // yellow
        medium: '#ff8000', // orange
        high: '#ff0000', // red
        veryHigh: '#8000ff'  // purple
    };
}
