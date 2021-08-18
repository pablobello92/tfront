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

    /**
     * Old and unused functions... We ain't going to generate any excel
     */

    generateExcel(data: any, filename: string): string {
        const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.click();
        return url;
    }

    getMySQLDate(date: Date): string {
        return (date != null) ? date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() : null;
    }

    getSize = function (obj: Object): number {
        let size = 0;
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                size++;
            }
        }
        return size;
    };

}
