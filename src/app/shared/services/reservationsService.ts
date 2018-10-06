import {
  Injectable
} from '@angular/core';
import {
  AppConfig
} from '../../configs/app.config';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable,
  empty
} from 'rxjs';
import {
  map,
  catchError
} from 'rxjs/operators';
import {
  CommonService
} from './commonService';

@Injectable()
export class ReservationsService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private _common: CommonService
  ) {}

  // tslint:disable-next-line:max-line-length
  getServicesByUser(rowsPerPage: number, page: number, userType: string, idTable: string, status: number, lang: number, payment: string, sort: object, dateFilter: object, mainFilter: object): Observable < any > {

    const endpoint = this.appConfig.server + this.appConfig.endpoints.service.getall;
    let params = '?count=' + rowsPerPage;
    params += '&page=' + page;

    if (dateFilter['search_date_from'] != null) {
      params += '&search_date_from=' + dateFilter['search_date_from'];
    }
    if (dateFilter['search_date_until'] != null) {
      params += '&search_date_until=' + dateFilter['search_date_until'];
    }

    if (status !== null) {
      params += '&filter' + '%5B';
      params += 'shuttle_booking.provider_status' + '%5D' + '=';
      params += status;
    }

    if (lang !== null) {
      params += '&filter' + '%5B';
      params += 'id_lang' + '%5D' + '=';
      params += lang;
    }

    if (payment !== null) {
      params += '&filter' + '%5B';
      params += 'payment_type' + '%5D' + '=';
      params += payment;
    }

    for (const key in mainFilter) {
      if (mainFilter.hasOwnProperty(key)) {
        params += '&filter' + '%5B';
        params += key + '%5D' + '=';
        params += mainFilter[key].value;
      }
    }


    if (userType === '2') {
      params += '&filter' + '%5B';
      params += 'shuttle_provider.id' + '%5D' + '=';
      params += idTable;
    }

    if (sort['field'] != null && sort['order'] != null) {
      params += '&sorting' + '%5B';
      params += sort['field'] + '%5D' + '=';
      params += (sort['order'] === 1) ? 'ASC' : 'DESC';
    }

    const url = endpoint + params;
    return this.http.get(url);
  }

  getReservation(id: number): Observable < any > {
    const endpoint = this.appConfig.server + this.appConfig.endpoints.reservation.get;
    const params = '?id=' + id;
    const url = endpoint + params;
    return this.http.get(url);
  }

  setReservation(id: number, reservationData: object): Observable < any > {
    const endpoint = this.appConfig.server + this.appConfig.endpoints.reservation.setprovider;
    reservationData['id'] = id;
    console.log(reservationData);
    return this.http.post(endpoint, reservationData)
      .pipe(map(res => {
        console.log(res);
        return res;
      }), catchError((err, caught) => {
        console.error(err);
        return new Observable(err);
      }));
  }

  setBookingPickUpTime(reservationData: object): Observable < any > {
    const endpoint = this.appConfig.server + this.appConfig.endpoints.bookingpickup.set;
    return this.http.post(endpoint, reservationData)
      .pipe(map(res => {
        return res;
      }), catchError((err, caught) => {
        return new Observable(err);
      }));
  }

  export (params: object, mainFilter: object): Observable < any > {
    const endpoint = this.appConfig.server + this.appConfig.endpoints.reservation.excel;

    for (const key in mainFilter) {
      if (mainFilter.hasOwnProperty(key)) {
        const value = mainFilter[key].value;
        params['filters'][key] = value;
      }
    }

    return this.http.post(endpoint, params, {
        responseType: 'arraybuffer'
      })
      .pipe(map(res => {
        return res;
      }), catchError((err, caught) => {
        return new Observable(err);
      }));
  }

  sendEmail(id: number, receiver: number): Observable < any > {
    const endpoint = this.appConfig.server + this.appConfig.endpoints.reservation.sendemail;
    const params = '?id=' + id + '&receiver=' + receiver;
    const url = endpoint + params;
    return this.http.get(url);
  }
}
