import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../intefaces/employee';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  private myAppUrl:string; 
  private myApiUrl :string

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/employees/';

  }


  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.myAppUrl}${this.myApiUrl}`); 
   }

  getEmployeesByCategory(): Observable<{ [key: string]: number }> {
    return this.getEmployees().pipe(
      map(employees => {
        const categoryCount: { [key: string]: number } = {};
        employees.forEach(employee => {
          if (categoryCount[employee.category]) {
            categoryCount[employee.category]++;
          } else {
            categoryCount[employee.category] = 1;
          }
        });
        return categoryCount;
      })
    );
  }

  getEmployeesByTeam(): Observable<{ [key: string]: number }> {
    return this.getEmployees().pipe(
      map(employees => {
        const teamCount: { [key: string]: number } = {};
        employees.forEach(employee => {
          if (teamCount[employee.team]) {
            teamCount[employee.team]++;
          } else {
            teamCount[employee.team] = 1;
          }
        });
        return teamCount;
      })
    );
  }
}