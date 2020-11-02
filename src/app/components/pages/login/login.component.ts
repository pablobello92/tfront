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
    AuthService
} from '../../../shared/services/auth.service';

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
        private _auth: AuthService
    ) {
        this.loginForm = this.fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    ngOnInit() {
        this._auth.logout();
    }

    get f(): any {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.loading = true;
        this._auth.login(this.f.username.value, this.f.password.value)
        .subscribe((res: any) => {
            if (res !== null) {
                this._auth.setCookie('logged', 'true');
                this._auth.setCookie('username', res.username);
                this._auth.setCookie('nickname', res.nickname);
                this._auth.setCookie('userLevel', res.userLevel);
                this.router.navigate(['']);
            } else {
                this.loading = false;
                this.badCredentials = true;
            }
        }, (error: any) => {
            // console.error(error);
            this.loginError = true;
            this.loading = false;
        });
    }
}
