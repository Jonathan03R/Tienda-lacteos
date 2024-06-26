import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { Empleados } from '../../../../model/interface/empleados';
import { EmpleadosService } from '../../../../controller/service/autenticacionController/empleados.service';
import { data, error } from 'jquery';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [
    CommonModule,FormsModule
  ],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrabajadoresComponent implements OnInit{ 

  // injecciones:
  private empleadosService = inject (EmpleadosService);
  private cdr = inject(ChangeDetectorRef);
  
  //atributos
  empleados: Empleados[] = []


  ngOnInit(): void {
      this.ListarEmpleados();
  }

  ListarEmpleados(){
    this.empleadosService.mostrarEmpleados().subscribe(
      (data) => {
        this.empleados = data;
        console.log("mostrar Empleados" ,this.empleados);
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error al cargar Empleados: ', error);
        this.cdr.markForCheck();
      }
    );
  }

}
