import {
    Component,
    OnInit,
    Input
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
    styleUrls: ['./sidebar.component.scss']
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
                routerLink: ['/'],
                enabled: true
            },
            {
                label: translations.titles.my_tracks,
                icon: 'emoji_transportation',
                routerLink: ['/user/tracks'],
                enabled: this._cookies.isRegularUser()
            },
            {
                label: translations.titles.sumarized_data,
                icon: 'analytics',
                routerLink: ['/sumarized-data'],
                enabled: true
            },
            {
                label: translations.titles.user_edit,
                icon: 'manage_accounts',
                routerLink: ['/user/edit'],
                enabled: true
            },
            {
                label: translations.titles.reparations,
                icon: 'edit_road',
                routerLink: ['/admin/reparations'],
                enabled: this._cookies.hasAdminLevel()
            },
            {
                label: translations.titles.tools,
                icon: 'build',
                routerLink: ['/admin/tools'],
                enabled: this._cookies.hasAdminLevel()
            }
        ];
    }

}
