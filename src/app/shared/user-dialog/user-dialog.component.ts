import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/UserDTO";

@Component({
  selector: 'app-element-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  element!: User;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: User,
    public dialogRef: MatDialogRef<UserDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    this.isChange = this.data.id != null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
