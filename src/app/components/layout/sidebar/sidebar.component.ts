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
} from 'src/app/shared/interfaces/MenuItem';
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
        this.links = [{
                label: translations.titles.home,
                icon: 'home',
                routerLink: ['/dashboard'],
                enabled: true
            },
            {
                label: translations.titles.my_tracks,
                icon: 'directions_car',
                routerLink: ['/user/tracks'],
                enabled: !this._cookies.isAdmin()
            },
            {
                label: translations.titles.sumarized_tracks,
                icon: 'public',
                routerLink: ['/sumarized-tracks'],
                enabled: true
            },
            {
                label: translations.titles.user_edit,
                icon: 'create',
                routerLink: ['/user/edit'],
                enabled: !this._cookies.isAdmin()
            },
            {
                label: translations.titles.reparations,
                icon: 'build',
                routerLink: ['/admin/reparations'],
                enabled: this._cookies.isAdmin()
            },
            {
                label: translations.titles.tools,
                icon: 'construction',
                routerLink: ['/admin/tools'],
                enabled: this._cookies.isAdmin()
            }
        ];
    }

}
