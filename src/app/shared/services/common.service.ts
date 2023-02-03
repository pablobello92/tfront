import {
    Injectable
} from '@angular/core';
import {
    TranslateService
} from '@ngx-translate/core';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import {
    MatSnackBar,
    MatSnackBarConfig
} from '@angular/material/snack-bar';
import {
    MapOptions
} from '../interfaces/City';


@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private standardConfig: MatSnackBarConfig<any> = {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
    }

    public mapOptionsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
        center: {
            lat: 0,
            lng: 0
        }
    });

    // TODO: this is for implementing the spinner later on
    private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoading$: Observable<boolean> = this._isLoading.asObservable();

    constructor(
        private _translate: TranslateService,
        private _snackBar: MatSnackBar
    ) {}

    public toggleIsLoading(): void {
        this._isLoading.next(!this._isLoading.value);
    }

    public displaySnackBar(msg_path: string, action: string, config: MatSnackBarConfig<any> = this.standardConfig): void {
        this._snackBar.open(this._translate.instant(msg_path), action, config);
    }

    public updateMapSubject(options: MapOptions): void {
        this.mapOptionsSubject.next(options);
    }

    public getMapSubject(): Observable<MapOptions> {
        return this.mapOptionsSubject.asObservable();
    }
}
