import { Router } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _router: Router,
  ) {}

  ngOnInit() {}

  public navigateTo(route: string): void {
    this._router.navigate([route]);
  }

}
