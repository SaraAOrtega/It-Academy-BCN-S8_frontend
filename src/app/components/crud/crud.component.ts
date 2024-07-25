import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Employee } from '../../intefaces/employee';
import { RouterLink } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent, CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  listEmployee: Employee []= []
  loading:boolean =false;
  private dialogOpen: boolean = false; // Variable para controlar el estado del diálogo

  constructor(private _employeeService: ServerService, public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListEmployees();
  }

  getListEmployees() {
    this.loading = true; 
    this._employeeService.getListEmployees().subscribe((data: Employee[]) => {
      this.listEmployee = data;
      this.loading =false; 

    });
  }

  

  openDeleteDialog(id: number) {
    if (this.dialogOpen) {
      return; // No abrir un nuevo diálogo si ya hay uno abierto
    }

    this.dialogOpen = true; // Marcar que el diálogo está abierto

    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '500px',
      height: '200px',
      disableClose: true,
      position: {
        left: '35%',
        top: '-10%'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false; // Marcar que el diálogo está cerrado

      if (result) {
        this.deleteEmployee(id);
      }
    });
  }

  deleteEmployee(id: number) {
    this._employeeService.deleteEmployee(id).subscribe(() => {
      this.getListEmployees();
      this.toastr.warning('Employee deleted successfully', 'Employee deleted');
    });
  }
}