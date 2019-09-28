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
        'users': {
            'login': 'users/login/',
            'get': 'users/',
            'update': 'users/update/'
        },
        'tracks': {
            'get': 'tracks/',
        },
    };
}
