import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class LocalStorageService {

  constructor(
    private cookies: CookieService
  ) {
  }

  getAllCookies(): any {
    this.cookies.getAll();
  }

  // TO-DO: expiracion de las cookies
  setUserDataField(key: string, value: string): void {
    this.cookies.set('user.' + key, value);
  }

  getUserDataField(key: string): string {
    return this.cookies.get('user.' + key);
  }

  removeAllUserData(): void {
    this.removeUserDataField('id');
    this.removeUserDataField('id_external_table');
    this.removeUserDataField('name');
    this.removeUserDataField('type');
    this.removeUserDataField('token');
  }

  removeUserDataField(key: string): void {
    this.cookies.delete('user.' + key);
  }

  isLogged(): boolean {
    return this.cookies.check('logged');
  }

  logIn(): void {
    this.cookies.set('logged', 'true');
  }

  logOut(): void {
    this.cookies.delete('logged');
    this.removeAllUserData();
  }
}
