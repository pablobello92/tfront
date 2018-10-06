import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  ReservationsService
} from '../../../../shared/services/reservationsService';
import {
  ConfirmationService,
  Message
} from 'primeng/api';

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.scss']
})
export class ServicesEditComponent implements OnInit {

  msgs: Message[] = [];

  editForm: FormGroup;
  reservationId: number;
  reservation: any;

  pickups: any[] = [];

  items: any[] = [];
  totalPrice = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _reservations: ReservationsService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private _confirmation: ConfirmationService
  ) {

    this.editForm = this.fb.group({
      'customer_name': [{
        value: null,
        disabled: true
      }],
      'customer_lastname': [{
        value: null,
        disabled: true
      }],
      'customer_email': [{
        value: null,
        disabled: true
      }],
      'customer_prefix': [{
        value: null,
        disabled: true
      }],
      'customer_phone': [{
        value: null,
        disabled: true
      }],
      'customer_adult': [{
        value: null,
        disabled: true
      }],
      'customer_children': [{
        value: null,
        disabled: true
      }],
      'customer_infants': [{
        value: null,
        disabled: true
      }],
      'hotel': [{
        value: null,
        disabled: true
      }],
      'address': [{
        value: null,
        disabled: true
      }],
      provider: this.fb.group({
        'name': [{
          value: null,
          disabled: true
        }],
        'phone': [{
          value: null,
          disabled: true
        }],
        'phone_emergency': [{
          value: null,
          disabled: true
        }]
      }),
      'provider_confirmed': [null],
      'collaborator_name': [{
        value: null,
        disabled: true
      }],
      'collaborator_phone': [{
        value: null,
        disabled: true
      }],
      'collaborator_fee': [{
        value: null,
        disabled: true
      }],
      'collab_payment_type': [{
        value: null,
        disabled: true
      }],
      pickups: this.fb.group({
        'arrival_date': [{
          value: null,
          disabled: true
        }],
        'arrival_hour': [{
          value: null,
          disabled: true
        }],
        'transport': [{
          value: null,
          disabled: true
        }],
        'transport_reference': [{
          value: null,
          disabled: true
        }],
      }),
      'comments_system': [null],
    });
  }

  ngOnInit() {
    this.reservationId = this.route.snapshot.params.id;
    this._reservations.getReservation(this.reservationId).subscribe(
      res => {
        if (res.status !== 'FAIL') {
          this.reservation = res;
          this.populateForm(this.reservation);
          this.calculateTotalPrice();
        }
      }, err => {
        console.error(err);
      });
  }

  get f(): any {
    return this.editForm.controls;
  }


  onSubmit() {
    this._confirmation.confirm({
      message: 'Está seguro que desea guardar los datos del servicio?',
      accept: () => {

        const params = {
          'provider': true,
          'id': this.reservationId,
          'comments_system': this.editForm.controls['comments_system'].value,
          'provider_confirmed': this.editForm.controls['provider_confirmed'].value
        };
        this._reservations.setReservation(this.reservationId, params)
          .subscribe(res => {
            console.log(res);
              this.msgs.push({
                severity: 'success',
                detail: 'Servicio guardado correctamente'
              });
            },
            err => {
              console.error(err);
              this.msgs.push({
                severity: 'error',
                detail: 'Error al guardar el servicio'
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
    this.router.navigate(['services/list']);
  }

  populateForm(res: any) {
    this.editForm.get('customer_name').setValue(res.customer_name);
    this.editForm.get('customer_lastname').setValue(res.customer_lastname);
    this.editForm.get('customer_email').setValue(res.customer_email);
    this.editForm.get('customer_prefix').setValue(res.customer_prefix);
    this.editForm.get('customer_phone').setValue(res.customer_phone);
    this.editForm.get('customer_adult').setValue(res.customer_adult);
    this.editForm.get('customer_children').setValue(res.customer_children);
    this.editForm.get('customer_infants').setValue(res.customer_infants);
    this.editForm.get('hotel').setValue(res.hotel);
    this.editForm.get('address').setValue(res.address);

    this.editForm.get('provider.name').setValue(res.provider.name);
    this.editForm.get('provider.phone').setValue(res.provider.phone);
    this.editForm.get('provider.phone_emergency').setValue(res.provider.phone_emergency);
    this.editForm.get('provider_confirmed').setValue(res.provider_confirmed);

    this.editForm.get('collaborator_name').setValue(res.collaborator_name);
    this.editForm.get('collaborator_phone').setValue(res.collaborator_phone);
    this.editForm.get('collaborator_fee').setValue(res.collaborator_fee);
    this.editForm.get('collab_payment_type').setValue(res.collab_payment_type);

    // No es iterable, pero tiene que elegir uno, el otro, o ambos, dependiendo si es ida o vuelta

    for (const item of res.pickups) {
      this.pickups.push(item);
    }

    for (const item of this.pickups) {
      this.editForm.get('pickups.arrival_date').setValue(item.arrival_date);
      this.editForm.get('pickups.arrival_hour').setValue(item.arrival_hour);
      this.editForm.get('pickups.transport').setValue(item.transport);
      this.editForm.get('pickups.transport_reference').setValue(item.transport_reference);
    }

    this.editForm.get('comments_system').setValue(res.comments_system);
  }

  calculateTotalPrice() {
    this.totalPrice += this.reservation.total_cost;
    this.reservation.items.forEach(element => {
      this.totalPrice += element.item_price;
    });
  }

}
