import {
    Injectable
} from '@angular/core';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CommonService {


    // TODO: this is for implementing the spinner later on
    private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoading$: Observable<boolean> = this._isLoading.asObservable();

    constructor() {}

    public toggleIsLoading(): void {
        this._isLoading.next(!this._isLoading.value);
    }
}
