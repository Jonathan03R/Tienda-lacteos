import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empleados } from '../../../model/interface/empleados';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private http = inject(HttpClient);
  private empleadosList: Empleados[] = [];
  private empleadosSubject = new BehaviorSubject<Empleados[]>(this.empleadosList);

  constructor() {}

  buscarEmpleadoInfo( email : string): Observable<any> {
    
    return this.http.get<Empleados>(`${BASE_URL}/empleados/email/${email}`);
      
  }

  addEmpleado(empleado: Empleados) {
    this.empleadosList.push(empleado);
    this.empleadosSubject.next(this.empleadosList);
  }


  getEmpleados(): Observable<Empleados[]> {
    return this.empleadosSubject.asObservable();
  }
}
