import {
  Component
} from '@angular/core';

import {
  TranslateService
} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Shuttle Dashboard';

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es_AR');
    this.translate.use('es_AR');
  }
}
