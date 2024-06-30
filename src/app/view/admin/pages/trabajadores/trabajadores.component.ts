import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { Empleados } from '../../../../model/interface/empleados';
import { EmpleadosService } from '../../../../controller/service/autenticacionController/empleados.service';
import { data, error } from 'jquery';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackBar = inject(MatSnackBar);
  
  //atributos
  empleados: Empleados[] = []


  ngOnInit(): void {
      this.ListarEmpleados();
      this.ListarCargos();
  }

  ListarEmpleados(){
    this.empleadosService.mostrarEmpleados().subscribe(
      (data) => {
        this.empleados = data;
        console.log("mostrar Empleados" ,this.empleados);
        this.snackBar.open('Empleados mostrados', 'Cerrar', {
          duration: 1000,
          horizontalPosition: 'center'
        });
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error al cargar Empleados: ', error);
        this.snackBar.open('error al encontrar empleados, comunicate con un administrador', 'Cerrar', {
          duration: 1000,
          horizontalPosition: 'center'
        });
        this.cdr.markForCheck();
      }
    );
  }

  actualizarEmpleado(empleado: Empleados) {
    this.empleadosService.actualizarEmpleado(empleado).subscribe(
      () => {
        console.log("Empleado actualizado", empleado);
        this.snackBar.open('Empleado Actualizado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end'
        });
      },
      (error) => {
        console.error('Error al actualizar Empleado: ', error);
        this.snackBar.open('A ocurrido un error comunicate con un administrador', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end'
        });
      }
    );
  } 

  cargos: any[] = [];

  ListarCargos() {
    this.empleadosService.mostrarCargos().subscribe(
      (data) => {
        this.cargos = data;
        console.log("mostrar Cargos", this.cargos);
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error al cargar Cargos: ', error);
        this.cdr.markForCheck();
      }
    );
  }
}
