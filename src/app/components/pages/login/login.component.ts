import {
    Component
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
    BehaviorSubject
} from 'rxjs';
import {
    CookiesService
} from '../../../shared/services/cookies.service';
import {
    UsersService
} from '../../../shared/services/users.service';
import {
    User
} from '../../../shared/interfaces/User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public loginForm: FormGroup;
    public message: string;

    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loginError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public badCredentials: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _cookies: CookiesService,
        private _users: UsersService
    ) {
        if (this._cookies.isLogged()) {
            this.router.navigate(['dashboard']);
        }

        this.loginForm = this.fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    get f(): any {
        return this.loginForm.controls;
    }

    public onSubmit(): void {
        this.loading.next(true);
        this._users.loginUser(this.f.username.value, this.f.password.value)
        .subscribe((user: User) => {
            if (user !== null) {
                this._cookies.setAllCookies(user);
                this.router.navigate(['dashboard']);
            } else {
                this.loading.next(false);
                this.badCredentials.next(true);
            }
        }, (error: any) => {
            this.loginError.next(true);
            this.loading.next(false);
        });
    }
}
