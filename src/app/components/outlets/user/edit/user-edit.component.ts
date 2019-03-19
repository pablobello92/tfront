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
  LocalStorageService
} from '../../../../shared/services/localStorageService';
import {
  ConfirmationService
} from 'primeng/components/common/confirmationservice';
import {
  ProvidersService
} from '../../../../shared/services/providersService';

import {
  Message
} from 'primeng/api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  msgs: Message[] = [];

  editForm: FormGroup;
  userName;userId: string;
  provider: any;

  constructor(
    private _localStorage: LocalStorageService,
    private _providers: ProvidersService,
    private _confirmation: ConfirmationService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.editForm = this.fb.group({
      'user': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required],
      'confirmPassword': [null, Validators.required],
      'name': [null],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'address': [null],
      'city': [null],
      'province': [null],
      'country': [null],
      'phone': [null],
      'phone_emergency': [null],
      'color': [null],
      'cif': [null],
      'iva_tax': [null],
      'contact_data': [null],
      'web': [null],
    }, {
      validator: this.MatchPassword // your validation method
    });
  }

  ngOnInit() {
    this.userName = this._localStorage.getUserDataField('name');
    this.userId = this._localStorage.getUserDataField('id_external_table');
    this._providers.getProvider(this.userId).subscribe(
      res => {
        if (res.status !== 'FAIL') {
          this.provider = res;
          this.populateForm(this.provider);
        }
      }, err => {
        console.error(err);
      });
  }

  MatchPassword(AC: AbstractControl) {
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

  onSubmit() {
    this._confirmation.confirm({
      message: 'Está seguro que desea guardar los datos del proveedor?',
      accept: () => {
        const params = this.editForm.value;
        this._providers.setProvider(this.userId, params)
          .subscribe(res => {
              this.msgs.push({
                severity: 'success',
                detail: 'Proveedor guardado correctamente.'
              });
            },
            err => {
              this.msgs.push({
                severity: 'error',
                detail: 'Error al intentar guardar el Proveedor.'
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

  goBack() {
    this.router.navigate(['dashboard']);
  }

  populateForm(res: any) {
    this.editForm.get('user').setValue(res.user);
    this.editForm.get('password').setValue(res.password);
    this.editForm.get('confirmPassword').setValue(res.password);
    this.editForm.get('name').setValue(res.name);
    this.editForm.get('email').setValue(res.email);
    this.editForm.get('address').setValue(res.address);
    this.editForm.get('city').setValue(res.city);
    this.editForm.get('province').setValue(res.province);
    this.editForm.get('country').setValue(res.country);
    this.editForm.get('phone').setValue(res.phone);
    this.editForm.get('phone_emergency').setValue(res.phone_emergency);
    this.editForm.get('color').setValue(res.color);
    this.editForm.get('cif').setValue(res.cif);
    this.editForm.get('iva_tax').setValue(res.iva_tax);
    this.editForm.get('web').setValue(res.web);
    this.editForm.get('contact_data').setValue(res.contact_data);
  }
}
