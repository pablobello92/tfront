import {
    Injectable
} from '@angular/core';


@Injectable()
export class CommonService {

    constructor() {}

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
