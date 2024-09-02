import { CommonModule } from '@angular/common';
import { Employee } from './../../intefaces/employee';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServerService } from '../../services/server.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-edit-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ProgressBarComponent, CommonModule],
  templateUrl: './add-edit-list.component.html',
  styleUrl: './add-edit-list.component.css',
})
export class AddEditListComponent implements OnInit {
  formData: FormGroup;
  submitted = false;
  loading: boolean = false;
  id: number;
  operacion: string = 'Add ';

  constructor(
    private fb: FormBuilder,
    private employee_service: ServerService,
    private router: Router,
    private toastr: ToastrService, 
    private aRouter: ActivatedRoute
  ) {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      team: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      // Es editar
      this.operacion = 'Edit ';
      this.getEmployee(this.id);
    }
  }

  async getEmployee(id: number) {
    this.loading = true;
    try {
      const data: Employee = await lastValueFrom(this.employee_service.getEmployee(id));
      console.log('Employee data:', data);
      console.log('Team:', data.team);
      console.log('Category:', data.category);
      console.log(data);

      this.formData.setValue({
        name: data.name,
        lastName: data.lastName,
        dni: data.dni,
        phone: data.phone,
        email: data.email,
        team: data.team,
        category: data.category,
      });
    } catch (error) {
      console.error('Error fetching employee data:', error);
      this.toastr.error('Failed to fetch employee data', 'Error');
    } finally {
      this.loading = false;
    }
  }

  async addEmployee() {
    this.submitted = true;
    if (this.formData.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const employee: Employee = {
      name: this.formData.value.name,
      lastName: this.formData.value.lastName,
      dni: this.formData.value.dni,
      phone: this.formData.value.phone,
      email: this.formData.value.email,
      team: this.formData.value.team,
      category: this.formData.value.category,
    };

    this.loading = true;
    try {
      if (this.id !== 0) {
        // Es editar
        employee.id = this.id;
        await lastValueFrom(this.employee_service.updateProduct(this.id, employee));
        this.toastr.info(`El empleado ${employee.name} fue actualizado con éxito`, 'Empleado actualizado');
      } else {
        await lastValueFrom(this.employee_service.saveEmployee(employee));
        this.toastr.success('Empleado agregado con éxito', 'Empleado agregado');
      }
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error saving employee data:', error);
      this.toastr.error('Failed to save employee data', 'Error');
    } finally {
      this.loading = false;
    }
  }

  onSubmit() {
    if (this.formData.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }
    this.addEmployee();
  }

  markAllFieldsAsTouched() {
    Object.values(this.formData.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
