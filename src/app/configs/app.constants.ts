import {
  Injectable
} from '@angular/core';
import {
  environment
} from '../../environments/environment';


@Injectable()
export class AppConstants {


  mailTo = {
    'customer': 1,
    'provider': 2,
    'collaborator': 3
  };

  userType = {
    'admin': 1,
    'provider': 2,
    'collaborator': 3,
    'channel': 4
  };

  messages = {
  };
}
