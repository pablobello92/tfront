import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    AuthService
} from '../../shared/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

    displaySidebar = true;

    constructor(
        private _auth: AuthService,
        private router: Router
    ) {}
}
