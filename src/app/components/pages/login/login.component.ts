import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import {
    CookiesService
} from '../../../shared/services/cookies.service';
import {
    UsersService
} from 'src/app/shared/services/users.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    message: string;
    loading = false;
    loginError = false;
    badCredentials = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _cookies: CookiesService,
        private _users: UsersService
    ) {
        this.loginForm = this.fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    ngOnInit() {
        if (this._cookies.isLogged()) {
            this.router.navigate(['dashboard']);
        }
    }

    get f(): any {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.loading = true;
        this._users.loginUser(this.f.username.value, this.f.password.value)
        .subscribe((res: any) => {
            if (res !== null) {
                this._cookies.setLoginCookies(res);
                this.router.navigate(['dashboard']);
            } else {
                this.loading = false;
                this.badCredentials = true;
            }
        }, (error: any) => {
            this.loginError = true;
            this.loading = false;
        });
    }
}
