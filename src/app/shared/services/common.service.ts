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


@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private standardConfig: MatSnackBarConfig<any> = {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
    }


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
}
