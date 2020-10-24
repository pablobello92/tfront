import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
    FormControl
} from '@angular/forms';
import {
    Router
} from '@angular/router';
import {
    ConfirmationService
} from 'primeng/components/common/confirmationservice';

import {
    Message
} from 'primeng/api';
import {
    UsersService
} from 'src/app/shared/services/users.service';
import {
    User
} from '../../../../shared/interfaces/User';
@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    msgs: Message[] = [];
    editForm: FormGroup;
    userName: string;
    nickName: string;

    constructor(
        private _users: UsersService,
        private _confirmation: ConfirmationService,
        private router: Router,
        private fb: FormBuilder
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
        this.userName = 'pablo_bello'; // TODO: vincular esta data a cookies
        this.nickName = 'Pablo Bello';
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

    onSubmit(): void { // TODO: Edición del usuario
        this._confirmation.confirm({
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            message: 'Está seguro que desea guardar los datos del usuario?',
            accept: () => {
                const user = < User > this.editForm.value;
                this._users.updateUser(user)
                    .subscribe((res: any) => {
                        this.msgs.push({
                        severity: 'success',
                        detail: 'Usuario actualizado exitosamente.'
                    });
                    }, (err: any) => {
                        console.error(err);
                        this.msgs.push({
                            severity: 'error',
                            detail: 'Error al intentar actualizar el usuario.'
                        });
                    });
            },
            reject: () => {
                this.msgs.push({
                    severity: 'warn',
                    detail: 'Acción cancelada'
                });
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
