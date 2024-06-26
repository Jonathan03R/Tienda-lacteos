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
  private empleadosList: Empleados[] = this.loadFromLocalStorage();
  private empleadosSubject = new BehaviorSubject<Empleados[]>(this.empleadosList);

  constructor() {}

  buscarEmpleadoInfo( email : string): Observable<any> {
    
    return this.http.get<Empleados>(`${BASE_URL}/empleados/email/${email}`);
      
  }

  addEmpleado(empleado: Empleados) {
    this.empleadosList.push(empleado);
    this.saveToLocalStorage(this.empleadosList);
    this.empleadosSubject.next(this.empleadosList);
  }

  removeEmpleado(email: string) {
    this.empleadosList = this.empleadosList.filter(e => e.Empleadoemail !== email);
    this.saveToLocalStorage(this.empleadosList);
    this.empleadosSubject.next(this.empleadosList);
  }



  getEmpleados(): Observable<Empleados[]> {
    return this.empleadosSubject.asObservable();
  }

  private saveToLocalStorage(empleados: Empleados[]) {
    localStorage.setItem('empleadosList', JSON.stringify(empleados));
  }

  private loadFromLocalStorage(): Empleados[] {
    const data = localStorage.getItem('empleadosList');
    return data ? JSON.parse(data) : [];
  }

  clearEmpleados() {
    this.empleadosList = [];
    this.saveToLocalStorage(this.empleadosList);
    this.empleadosSubject.next(this.empleadosList);
  }


  // conseguir una lista de todos los empleados.

  mostrarEmpleados(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(`${BASE_URL}/empleados/empleadosMostrar`)
  }


  actualizarEmpleado(empleado: Empleados): Observable<void> {
    return this.http.put<void>(`${BASE_URL}/empleados/actualizarEmpleados/${empleado.EmpleadoCodigo}`, empleado);
  }


  mostrarCargos(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/empleados/cargos`);
  }

}
