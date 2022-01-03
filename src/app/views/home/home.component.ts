import {Component, OnInit, ViewChild} from '@angular/core';
import {ElementDialogComponent} from "../../shared/element-dialog/element-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";
import {PeriodicElement} from "../../models/PeriodicElementDTO";
import {PeriodicElementService} from "../../services/periodicElement.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource!: PeriodicElement[];

  constructor(
    public dialog: MatDialog,
    public periodicElementService: PeriodicElementService
  ) {
    this.periodicElementService.getElements()
      .subscribe((data: PeriodicElement[]) => {
        this.dataSource = data;
      });
  }

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name: '',
        weight: null,
        symbol: ''
      } : {
        id: element.id,
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(value => value.id).includes(result.id)) {
          this.periodicElementService.editElement(result)
            .subscribe((data: PeriodicElement) => {
              const index = this.dataSource.findIndex(value => value.id === data.id);

              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.periodicElementService.createElement(result)
            .subscribe((data: PeriodicElement) => {
              this.dataSource.push(data);
              this.table.renderRows();
            })
        }
      }
    });
  }

  deleteElement(id: number): void {
    this.periodicElementService.deleteElement(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(value => value.id !== id)
      })
  }

  editElement(element: PeriodicElement): void {
    this.openDialog(element)
  }
}
