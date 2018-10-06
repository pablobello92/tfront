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
  catchError
} from 'rxjs/operators';
import {
  User
} from '../models/user.model';

@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
  }

  login(mail, pass): Observable < any > {
    const endpoint = this.appConfig.server + this.appConfig.endpoints.user.login;
    return this.http.post(endpoint, {
        email: mail,
        password: pass
      })
      .pipe(map(user => {
        return user;
      }), catchError((err, caught) => {
        return new Observable(err);
      }));
  }

  autoLogin(id_collaborator, token): Observable < any > {
    const endpoint = this.appConfig.server + this.appConfig.endpoints.user.autologin;
    return this.http.post(endpoint, {
        id_collaborator: id_collaborator,
        token: token
      })
      .pipe();
  }
}
