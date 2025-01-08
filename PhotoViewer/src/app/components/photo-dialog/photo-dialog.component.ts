import { Component, inject, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-photo-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './photo-dialog.component.html',
  styleUrl: './photo-dialog.component.scss'
})
export class PhotoDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PhotoDialogComponent>);
  readonly photo = inject<Photo>(MAT_DIALOG_DATA);

  public ngOnInit(): void {
    this.dialogRef.updateSize('80%', '80%');
  }

  public onCloseDialog(): void {
    this.dialogRef.close();
  }
}
