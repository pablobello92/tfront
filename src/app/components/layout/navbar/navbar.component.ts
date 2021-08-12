import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    TranslateService
} from '@ngx-translate/core';
import {
    SelectItem
} from 'primeng/api';
import {
    CookiesService
} from '../../../shared/services/cookies.service';
import {
    MatSnackBar
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

    @Input() display: boolean;
    @Output() displayChange: EventEmitter < boolean > = new EventEmitter < boolean > ();

    userName: string;
    langs: SelectItem[] = [];

    constructor(
        private router: Router,
        private translate: TranslateService,
        private _cookies: CookiesService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.langs = [{
                'label': 'espanol',
                'value': 'es_AR'
            },
            {
                'label': 'english',
                'value': 'en'
            }
        ];
        this.userName = this._cookies.getCookie('nickname');
    }

    logout() {
        this._cookies.deleteAllCookies();
        this.router.navigate(['login']);
    }

    goHome() {
        this.router.navigate(['dashboard']);
    }

    changeLang($event) {
        this.translate.use($event.value);
    }

    collapseSidebar() {
        this.displayChange.emit(!this.display);
    }

    gotoProfile() {
        if (this._cookies.isAdmin()) {
            this._snackBar.open('Actualmente un admin no puede editar su perfil', 'Ok', {
                duration: 1500,
                horizontalPosition: 'right',
                verticalPosition: 'top',
            });
        } else {
            this.router.navigate(['user/edit']);
        }
    }

}
