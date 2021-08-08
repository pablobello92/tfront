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
} from 'primeng/api';
import {
    CookiesService
} from '../../../shared/services/cookies.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {

    @Input() display: boolean;

    links: MenuItem[] = [];

    translations: any;

    constructor(
        private _cookies: CookiesService,
        private translate: TranslateService
    ) {
        // TODO: probably we could make everything in the constructor, adding a startWith()
        // This way we get rid of having two subscriptions, for the first is only used for initialization
        this.translate.reloadLang(this.translate.currentLang)
            .subscribe((translations: any) => {
                this.setLinks(translations);
            });
    }

    ngOnInit() {
        this.translate.onLangChange
            .subscribe(_ => {
                this.translate.reloadLang(this.translate.currentLang)
                    .subscribe((translations: any) => {
                        this.setLinks(translations);
                    });
            });
    }

    setLinks(translations: any) {
        this.links = [
            {
                label: translations.titles.home,
                icon: 'home',
                routerLink: ['/dashboard']
            },
            {
                label: translations.titles.my_tracks,
                icon: 'directions_car',
                routerLink: (this._cookies.isAdmin()) ? null : ['/user/tracks'],
                disabled: this._cookies.isAdmin()
            },
            {
                label: translations.titles.sumarized_tracks,
                icon: 'public',
                routerLink: ['/sumarized-tracks']
            },
            {
                label: translations.titles.user_edit,
                icon: 'create',
                routerLink: (this._cookies.isAdmin()) ? null : ['/user/edit'],
                disabled: this._cookies.isAdmin()
            },
            {
                label: translations.titles.reparations,
                icon: 'build',
                routerLink: (this._cookies.isAdmin()) ? ['/admin/reparations'] : null,
                visible: this._cookies.isAdmin()
            },
            {
                label: translations.titles.tools,
                icon: 'construction',
                routerLink: (this._cookies.isAdmin()) ? ['/admin/tools'] : null,
                visible: this._cookies.isAdmin()
            }
        ];
    }

}
