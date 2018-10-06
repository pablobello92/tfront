import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  UsersService
} from '../../../shared/services/usersService';
import {
  LocalStorageService
} from '../../../shared/services/localStorageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  message: string;
  submitted;loading;loginError;badCredentials = false;

  constructor(
    private usersService: UsersService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.localStorageService.logOut();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.badCredentials = false;
    this.loginError = false;
    this.loading = true;
    this.usersService.login(this.f.email.value, this.f.password.value)
    .subscribe(res => {
      if (res.status === 'OK') {
        this.localStorageService.logIn();
        this.localStorageService.setUserDataField('id', res.id);
        this.localStorageService.setUserDataField('id_external_table', res.id_external_table);
        this.localStorageService.setUserDataField('name', res.name);
        this.localStorageService.setUserDataField('type', res.type);
        this.localStorageService.setUserDataField('token', res.token);
        this.router.navigate(['']);
      } else {
        this.loading = false;
        this.loginError = true;
      }
    }, err => {
      this.badCredentials = true;
      this.loading = false;
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }
}
