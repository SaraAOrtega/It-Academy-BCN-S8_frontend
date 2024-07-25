import { CommonModule } from '@angular/common';
import { Employee } from './../../intefaces/employee';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServerService } from '../../services/server.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


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
    private aRouter: ActivatedRoute) {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', Validators.required, Validators.email],
      team: ['', Validators.required],
      category: ['', Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

    
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Edit ';
      this.getEmployee(this.id);
    }
  }

 getEmployee(id: number) { 
    this.loading = true;
   this.employee_service.getEmployee(id).subscribe((data:Employee) => {
  
      console.log('Employee data:', data); // Esto debería mostrar todos los datos
      console.log('Team:', data.team); // Asegúrate de que no sea null o undefined
      console.log('Category:', data.category); // Asegúrate de que no sea null o undefined
      console.log (data)
      this.loading = false;
      this.formData.setValue({
        name: data.name,
        lastName: data.lastName,
        dni: data.dni,
        phone: data.phone, 
        email: data.email, 
        team: data.team, 
        category: data.category, 
      })
    })
  }


  addEmployee() {
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

    if (this.id !== 0) {
      // Es editar 
      employee.id = this.id;
      this.employee_service.updateProduct(this.id, employee).subscribe(() => {
        this.toastr.info(`El empleado ${employee.name} fue actualizado con exito`, 'Empleado actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    } else {
    this.employee_service.saveEmployee(employee).subscribe(() => {
      this.loading = false;
      this.toastr.success('Employee add successfully', 'Employee add');
      this.router.navigate(['/']);
    });
  }
}

  onSubmit() {
    if (this.formData.invalid) {
      this.markAllFieldsAsTouched(); // Marca todos los campos como tocados
      return;
    }
  }

  markAllFieldsAsTouched() {
    Object.values(this.formData.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
