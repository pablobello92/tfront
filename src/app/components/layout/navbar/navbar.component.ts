import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  LocalStorageService
} from '../../../shared/services/localStorageService';
import {
  SelectItem
} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  userName: string;

  langs: SelectItem[] = [];
  selectedLang: SelectItem;

  constructor(
    private localStorage: LocalStorageService,
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
    }];
    this.selectedLang = this.langs[0];
    this.userName = this.localStorage.getUserDataField('name');
  }

  logout() {
    this.localStorage.logOut();
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
    this.router.navigate(['user/edit']);
  }

}
