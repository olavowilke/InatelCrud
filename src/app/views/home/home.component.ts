import {Component, OnInit, ViewChild} from '@angular/core';
import {UserDialogComponent} from "../../shared/user-dialog/user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/UserDTO";
import {UserService} from "../../services/user.service";
import {GetAllUsersDto} from "../../models/GetAllUsersDto";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['job', 'name', 'action'];
  dataSource!: User[];

  constructor(
    public dialog: MatDialog,
    public userService: UserService
  ) {
  }

  loadData(): void{
    this.userService.getAllUsers()
      .subscribe((res) => {
        this.dataSource = res;
      });
  }

  ngOnInit(): void {
    this.loadData();
  }

  openDialog(user: User | null): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: user === null ? {
        job: '',
        name: ''
      } : {
        id: user.id,
        job: user.job,
        name: user.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(value => value.id).includes(result.id)) {
          this.userService.editUser(result)
            .subscribe((data: User) => {
              const index = this.dataSource.findIndex(value => value.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.userService.createUser(result)
            .subscribe((data: User) => {
              this.dataSource.push(data);
              this.table.renderRows();
            })
        }
      }
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(value => value.id !== id)
      })
  }

  editUser(user: User): void {
    this.openDialog(user)
  }

}
