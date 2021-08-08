import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    Router
} from '@angular/router';
import {
    TranslateService
} from '@ngx-translate/core';
import {
    SelectItem,
    Message
} from 'primeng/api';
import {
    CookiesService
} from '../../../shared/services/cookies.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

    @Input() display: boolean;
    @Output() displayChange: EventEmitter < boolean > = new EventEmitter < boolean > ();

    msgs: Message[] = [];
    userName: string;

    langs: SelectItem[] = [];

    constructor(
        private _cookies: CookiesService,
        private router: Router,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.langs = [{
                'label': 'spa',
                'value': 'es_AR'
            },
            {
                'label': 'eng',
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
            this.msgs.push({
                severity: 'warning',
                detail: 'Actualmente un admin no puede editar su perfil.'
            });
        } else {
            this.router.navigate(['user/edit']);
        }
    }

}
