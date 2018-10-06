import {
  Component,
  OnInit,
  NgZone,
  Input
} from '@angular/core';
import {
  TranslateService,
  LangChangeEvent
} from '@ngx-translate/core';
import {
  AppConfig
} from '../../../configs/app.config';


import {
  MenuItem
} from 'primeng/primeng';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() display: boolean;

  items: MenuItem[] = [];

  translations: any;

  constructor(
    private zone: NgZone,
    private appConfig: AppConfig,
    private translate: TranslateService
  ) {
    this.translate.reloadLang(this.translate.currentLang).subscribe(
      res => {
        this.setItems(res);
      });
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe(
      () => {
        this.translate.reloadLang(this.translate.currentLang).subscribe(
          res => {
            this.setItems(res);
          });
      });
  }

  setItems(translations: any) {
    this.items = [{
        label: translations.sidebar.heading.HEADER,
        items: [{
          label: translations.general.BEGIN,
          icon: 'fa fa-fw fa-home',
          routerLink: ['/dashboard']
        }]
      },
      {
        label: translations.sidebar.nav.providers.PROVIDERS,
        items: [{
          label: translations.views.providers.form.EDIT_PROFILE,
          icon: 'fa fa-fw fa-pencil',
          routerLink: ['/provider/edit']
        }]
      },
      {
        label: translations.sidebar.nav.services.SERVICES,
        items: [{
          label: translations.general.LIST,
          icon: 'fa fa-fw fa-th-list',
          routerLink: ['/services/list']
        }]
      }
    ];
  }

}
