// crud.component.ts
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../intefaces/employee';
import { RouterLink } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent, CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit {
  @ViewChild('deleteEmployeeModal') deleteEmployeeModal!: TemplateRef<any>;

  listEmployee: Employee[] = [];
  loading: boolean = false;
  public modalRef: NgbModalRef | null = null;
  private employeeToDeleteId: number | null = null;

  constructor(
    private _employeeService: ServerService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListEmployees();
  }

  getListEmployees() {
    this.loading = true;
    this._employeeService.getListEmployees().subscribe((data: Employee[]) => {
      this.listEmployee = data;
      this.loading = false;
    });
  }

  openDeleteModal(id: number) {
    this.employeeToDeleteId = id;
    this.modalRef = this.modalService.open(this.deleteEmployeeModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
  }

  confirmDeleteEmployee() {
    if (this.employeeToDeleteId !== null) {
      this.deleteEmployee(this.employeeToDeleteId);
      this.modalRef?.close();
      this.employeeToDeleteId = null;
    }
  }

  deleteEmployee(id: number) {
    this._employeeService.deleteEmployee(id).subscribe(() => {
      this.getListEmployees();
      this.toastr.warning('Employee deleted successfully', 'Employee deleted');
    });
  }
}