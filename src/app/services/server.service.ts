import { Employee } from './../intefaces/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private myAppUrl:string; 
  private myApiUrl :string

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/employees/';

  }

  getListEmployees(): Observable<Employee[]>{
   return this.http.get<Employee[]>(`${this.myAppUrl}${this.myApiUrl}`); 
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`); 
  }

  saveEmployee(employee:Employee): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, employee); 
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, employee);
  }
}






