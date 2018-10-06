import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  LocalStorageService
} from '../../shared/services/localStorageService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displaySidebar = true;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (!this.localStorage.isLogged()) {
      this.router.navigate(['login']);
    }
  }

}
