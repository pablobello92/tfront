import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UsersService
} from '../../../../shared/services/usersService';
import {
  AppConfig
} from '../../../../configs/app.config';
import {
  LocalStorageService
} from '../../../../shared/services/localStorageService';
import {
  ReservationsService
} from '../../../../shared/services/reservationsService';
import {
  CommonService
} from '../../../../shared/services/commonService';

import {
  ConfirmationService,
  SelectItem,
  SortEvent,
  Message
} from 'primeng/api';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  dateFrom;
  dateUntil: Date;
  data;
  states: any;
  msgs: Message[] = [];
  langs: SelectItem[];
  payments: SelectItem[] = [];

  length;
  totalPrices;
  totalCostPrices;
  totalBeneficio: number;
  userType;
  idTable: string;

  rowsPerPage = 50;
  page = 1;
  status: number = null;
  lang: number = null;
  payment: string = null;

  sort = {
    'field': null,
    'order': null
  };
  dateFilter = {
    'search_date_from': null,
    'search_date_until': null
  };
  mainFilter: any = null;

  columns: Array < any > = [{
      field: 'reference_id',
      sortField: 'reference_id',
      filter: true,
      title: 'views.services.BEEPER',
      header: 'Localizador',
      width: '115px'
    },
    {
      field: 'date',
      sortField: 'time_arrival',
      filter: true,
      title: 'views.services.DATE',
      header: 'Fecha de llegada',
      width: '115px'
    },
    {
      field: 'destination',
      sortField: 'shuttle_destination.name',
      filter: true,
      title: 'views.services.DESTINATION',
      header: 'Destino',
      width: '100px'
    },
    {
      field: 'provider_status',
      sortField: 'shuttle_booking.provider_status',
      filter: true,
      title: 'views.services.PROVIDER_STATUS',
      header: 'Estado del Proveedor',
      width: '125px'
    },
    {
      field: 'route',
      title: 'views.services.ROUTE',
      filter: false,
      header: 'Trayecto',
      width: '115px'
    },
    {
      field: 'transport',
      sortField: 'transport',
      filter: true,
      title: 'views.services.VEHICLE',
      header: 'Transporte',
      width: '115px'
    },
    {
      field: 'extra',
      sortField: 'shuttle_item.shortcode',
      title: 'views.services.EXTRA',
      filter: false,
      header: 'Extras',
      width: '115px'
    },
    {
      field: 'adults',
      title: 'views.services.ADULTS',
      filter: false,
      header: 'Adultos',
      width: '65px'
    },
    {
      field: 'children',
      title: 'views.services.CHILDREN',
      filter: false,
      header: 'Niños',
      width: '65px'
    },
    {
      field: 'infants',
      title: 'views.services.INFANTS',
      filter: false,
      header: 'Bebés',
      width: '65px'
    },
    {
      field: 'id_lang',
      sortField: 'id_lang',
      header: 'Idioma',
      title: 'views.reservations.form.LANG',
      filter: true,
      width: '100px'
    },
    {
      field: 'comments_client',
      sortField: 'comments_client',
      filter: true,
      header: 'Comentarios del Cliente',
      title: 'views.services.COMMENTS_CLIENT',
      width: '115px'
    },
    {
      field: 'pickup_time',
      sortField: 'pickup_time',
      filter: true,
      header: 'Hora de Recogida',
      title: 'views.services.PICKUP_TIME',
      width: '100px'
    },
    {
      field: 'pickup_point',
      sortField: 'pickup_point',
      filter: true,
      header: 'Punto de Recogida',
      title: 'views.services.PICKUP_POINT',
      width: '100px'
    },
    {
      field: 'price',
      sortField: 'shuttle_booking.cost_price',
      filter: true,
      header: 'Precio',
      title: 'general.PRICE',
      width: '80px'
    },
    {
      field: 'payment_type',
      sortField: 'payment_type',
      filter: true,
      header: 'Tipo de Pago',
      title: 'views.reservations.PAYMENT_TYPE',
      width: '100px'
    },
    {
      field: 'phone',
      sortField: 'shuttle_booking_customer_info.phone',
      filter: true,
      header: 'Teléfono',
      title: 'views.services.PHONE',
      width: '100px'
    },
    {
      field: 'name',
      sortField: 'shuttle_booking_customer_info.name',
      filter: true,
      header: 'Nombre',
      title: 'views.services.NAME',
      width: '100px'
    },
    {
      field: 'hotel',
      sortField: 'hotel',
      filter: true,
      header: 'Hotel',
      title: 'views.services.HOTEL',
      width: '110px'
    }
  ];

  extraColumns: Array < any > = [{
    title: 'general.EDIT',
    width: '55px'
  }];

  constructor(
    private _reservations: ReservationsService,
    private _appConfig: AppConfig,
    private _confirmation: ConfirmationService,
    private _common: CommonService,
    private _localStorage: LocalStorageService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.states = [{
        label: 'general.ALL',
        value: null
      },
      {
        label: 'general.REJECTED',
        value: 0
      },
      {
        label: 'general.ASSIGNED',
        value: 1
      },
      {
        label: 'general.PENDING',
        value: 2
      }
    ];

    this.langs = [{
        label: 'general.ALL',
        value: null
      },
      {
        label: 'ES',
        value: '1'
      },
      {
        label: 'ENG',
        value: '2'
      },
      {
        label: 'GER',
        value: '3'
      }
    ];

    this.payments = [{
      label: 'general.ALL',
      value: null
    },
    {
      label: 'CC',
      value: 1
    },
    {
      label: 'TPV',
      value: 2
    },
    {
      label: 'PAYPAL',
      value: 3
    }
  ];
    this.userType = this._localStorage.getUserDataField('type');
    this.idTable = this._localStorage.getUserDataField('id_external_table');
  }

  loadLazy($event) {
    $event.preventDefault = true;
    if (this.sort.field !== $event.sortField || this.sort.order !== $event.sortOrder) {
      this.sort.field = $event.sortField;
      this.sort.order = $event.sortOrder;
    }
    this.mainFilter = $event.filters;
    this.fireSearch();
  }

  paginate($event) {
    this.page = $event.page + 1;
    this.fireSearch();
  }

  clearFilters() {
    this.status = null;
    this.lang = null;
    this.payment = null;
    this.dateFrom = null;
    this.dateUntil = null;
    this.mainFilter = null;
    this.fireSearch();
  }

  onFilterChange(sortField, $event) {
    if (sortField === 'id_lang') {
      this.lang = $event.value;
    } else if (sortField === 'payment_type') {
      this.payment = $event.value;
    } else {
      this.status = $event.value;
    }
    this.fireSearch();
  }

  fireSearch() {
    if (!this.checkDateFilters()) {
      return;
    }
    this.dateFilter.search_date_from = this._common.getMySQLDate(this.dateFrom);
    this.dateFilter.search_date_until = this._common.getMySQLDate(this.dateUntil);
    this.loadData();
  }

  loadData(): void {
    // tslint:disable-next-line:max-line-length
    this._reservations.getServicesByUser(this.rowsPerPage, this.page, this.userType, this.idTable, this.status, this.lang, this.payment, this.sort, this.dateFilter, this.mainFilter)
      .subscribe(
        response => {
          this.data = response.rows;
          this.length = response.total;
        },
        error => {
          console.error(error);
        });
  }

  onEditPickUpTime($event) {
    const params = {
      'id': $event.data.id_booking_pickup,
      'pickup_time': $event.data.pickup_time
    };
    this._reservations.setBookingPickUpTime(params).subscribe(
      resp => {
        this.msgs.push({
          severity: 'success',
          detail: 'Hora de recogida guardada correctamente'
        });
      },
      err => {
        console.error(err);
        this.msgs.push({
          severity: 'error',
          detail: 'Error al guardar la hora de recogida'
        });
      });
  }

  export () {
    if (!this.checkDateFilters()) {
      return;
    }
    const params = {
      filters: {
        'shuttle_provider.id': this.idTable
      },
      'search_date_from': this._common.getMySQLDate(this.dateFrom),
      'search_date_until': this._common.getMySQLDate(this.dateUntil)
    };
    this._reservations.export(params, this.mainFilter).subscribe(
      res => {
        this._common.generateExcel(res, 'Shuttle_services.xlsx');
      },
      err => {
        console.error(err);
      });
  }

  edit(service) {
    this._router.navigate(['services/edit/', service.id]);
  }

  checkDateFilters(): boolean {
    if (this.dateFrom > this.dateUntil) {
      this.msgs.push({
        severity: 'error',
        detail: 'Filtrado: La fecha inicial no puede ser mayor a la final'
      });
      return false;
    }
    return true;
  }

  match(str1, str2) {
    return str1.includes(str2);
  }

}
