import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation
} from '@angular/core';
import {
    TranslateService
} from '@ngx-translate/core';
import {
    MenuItem
} from 'primeng/primeng';
import {
    AuthService
} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {

    @Input() display: boolean;

    items: MenuItem[] = [];

    translations: any;

    constructor(
        private _auth: AuthService,
        private translate: TranslateService
    ) {
        this.translate.reloadLang(this.translate.currentLang).subscribe(res => {
            this.setItems(res);
        });
    }

    ngOnInit() {
        this.translate.onLangChange.subscribe(() => {
            this.translate.reloadLang(this.translate.currentLang).subscribe(res => {
                this.setItems(res);
            });
        });
    }

    setItems(translations: any) {
        this.items = [
            {
                label: translations.titles.home,
                icon: 'fa fa-fw fa-home',
                routerLink: ['/dashboard']
            },
            {
                label: translations.titles.my_tracks,
                icon: 'fa fa-fw fa-car',
                routerLink: (this._auth.isAdmin()) ? null : ['/user/tracks'],
                disabled: this._auth.isAdmin()
            },
            {
                label: translations.titles.sumarized_tracks,
                icon: 'fa fa-fw fa-globe',
                routerLink: ['/sumarized-tracks']
            },
            {
                label: translations.titles.user_edit,
                icon: 'fa fa-fw fa-pencil',
                routerLink: (this._auth.isAdmin()) ? null : ['/user/edit'],
                disabled: this._auth.isAdmin()
            },
            {
                label: translations.titles.reparations,
                icon: 'fa fa-fw fa-wrench',
                routerLink: (this._auth.isAdmin()) ? ['/admin/reparations'] : null,
                visible: this._auth.isAdmin()
            },
            {
                label: translations.titles.tools,
                icon: 'fa fa-fw fa-cog',
                routerLink: (this._auth.isAdmin()) ? ['/admin/tools'] : null,
                visible: this._auth.isAdmin()
            }
        ];
    }

}
