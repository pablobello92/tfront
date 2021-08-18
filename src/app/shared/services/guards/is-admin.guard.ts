import {
    Injectable
} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {
    Observable
} from 'rxjs';
import {
    CookiesService
} from '../cookies.service';

@Injectable({
    providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

    constructor(
        private cookies: CookiesService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
        if( this.cookies.isAdmin() ) {
            return true;
        } else {
            this.router.navigate(['dashboard']);
            return false;
        }
    }

}
