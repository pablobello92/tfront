import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl
} from '@angular/forms';
import {
    Router
} from '@angular/router';
import {
    UsersService
} from './../../../../shared/services/users.service';
import {
    CookiesService
} from '../../../../shared/services/cookies.service';
import {
    CommonService
} from '../../../../../app/shared/services/common.service';
import {
    User
} from '../../../../shared/interfaces/User';
import {
    ConfirmDialogComponent
} from '../../../../../app/components/shared/confirm-dialog/confirm-dialog.component';
import {
    MatDialog
} from "@angular/material/dialog";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    editForm: FormGroup;
    userName: string;
    nickName: string;

    constructor(
        private _users: UsersService,
        private _cookies: CookiesService,
        private _common: CommonService,
        private router: Router,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) {
        this.editForm = this.fb.group({
            '_id': [null, Validators.required],
            'username': [null, Validators.required],
            'nickname': [null, Validators.required],
            'password': [null, Validators.required],
            'confirmPassword': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'sex': [null, Validators.required],
            'yearofbirth': [null, Validators.required],
            'smartphone': this.fb.group({
                'brand': [null, Validators.required],
                'model': [null, Validators.required],
            }),
            'car': this.fb.group({
                'brand': [null, Validators.required],
                'model': [null, Validators.required],
                'year': [null, Validators.required]
            })
        }, {
            validator: this.MatchPassword
        });
    }

    ngOnInit(): void {
        this.userName = this._cookies.getCookie('username');
        this.nickName = this._cookies.getCookie('nickname');
        this._users.getUser(this.userName)
            .subscribe((user: User) => {
                this.populateForm(user);
            }, (err: any) => {
                console.error(err);
            });
    }

    MatchPassword(AC: AbstractControl): void {
        if (AC.get('password').value !== AC.get('confirmPassword').value) {
            AC.get('confirmPassword').setErrors({
                match: true
            });
        } else {
            return null;
        }
    }

    get f(): any {
        return this.editForm.controls;
    }

    // TODO: add i18n for this
    // TODO: Add success/error/warn classes for the snackbars
    onSubmit(): void {
        this.dialog.open(ConfirmDialogComponent, {
                data: {
                    title: 'Confirmación',
                    body: 'Está seguro que desea guardar los datos del usuario?'
                }
            })
            .afterClosed()
            .subscribe((result: boolean) => {
                if (result) {
                    const user = < User > this.editForm.value;
                    this._users.updateUser(user)
                        .subscribe((res: any) => {
                            this._common.displaySnackBar('messages.snackbar.success', 'Ok');
                        }, (err: any) => {
                            console.error(err);
                            this._common.displaySnackBar('messages.snackbar.error', 'Ok');
                        });
                } else {
                    this._common.displaySnackBar('messages.snackbar.action_canceled', 'Ok');
                }
            });
    }

    goBack(): void {
        this.router.navigate(['dashboard']);
    }

    populateForm(res: User): void {
        this.editForm.get('_id').setValue(res._id);
        this.editForm.get('username').setValue(res.username);
        this.editForm.get('nickname').setValue(res.nickname);
        this.editForm.get('password').setValue(res.password);
        this.editForm.get('confirmPassword').setValue(res.password);
        this.editForm.get('email').setValue(res.email);
        this.editForm.get('sex').setValue(res.sex);
        this.editForm.get('yearofbirth').setValue(res.yearofbirth);
        this.editForm.get('smartphone').get('brand').setValue(res.smartphone.brand);
        this.editForm.get('smartphone').get('model').setValue(res.smartphone.model);
        this.editForm.get('car').get('brand').setValue(res.car.brand);
        this.editForm.get('car').get('model').setValue(res.car.model);
        this.editForm.get('car').get('year').setValue(res.car.year);
    }
}
