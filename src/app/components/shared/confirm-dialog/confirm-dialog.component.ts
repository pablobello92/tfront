import {
    Component,
    Inject
} from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';

export interface DialogData {
    title: string;
    body: string;
    showCancelButton: boolean;
};

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    constructor(
        public dialogRef: MatDialogRef <ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public config: DialogData
    ) {}

    public cancelClick(): void {
        this.dialogRef.close(false);
    }

    public acceptClick(): void {
        this.dialogRef.close(true);
    }
}
