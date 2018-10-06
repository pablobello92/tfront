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
    'reservation': {
      'getall': 'reservation/getall',
      'get': 'reservation/get',
      'set': 'reservation/set',
      'setprovider': 'reservation/setprovider',
      'excel': 'reservation/excel',
      'sendemail': 'reservation/sendemail'
    },
    'service': {
      'getall': 'reservation/getallservices'
    },
    'bookingpickup': {
      'set': 'bookingpickup/set'
    },
    'user': {
      'login': 'user/login',
      'autologin': 'user/autologin'
    },
    'provider': {
      'get': 'provider/get',
      'set': 'provider/set'
    }
  };
}
