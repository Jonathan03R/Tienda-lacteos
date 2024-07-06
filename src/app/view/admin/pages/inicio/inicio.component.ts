import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ClienteInfoService } from '../../../../controller/service/pedidos/clienteInfo.service';
import { ChartData, ChartOptions, ChartTypeRegistry, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import { DashboardService } from '../../../../controller/service/informes/dashboard.service';
import { Empleados } from '../../../../model/interface/empleados';
import { EmpleadosService } from '../../../../controller/service/autenticacionController/empleados.service';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InicioComponent {
  topClientes: any[] = [];

  productosMasVendidos: any[] = [];
  gananciasPorMes: any[] = [];
  ultimosEmpleados: Empleados[] = [];

  ventasData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Ganancia' }
    ]
  };

  ventasOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category', 
      },
      y: {
        beginAtZero: true
      }
    }
  };

  private clienteInfoService = inject(ClienteInfoService);
  private dashboardService = inject(DashboardService);
  private empleadosService = inject(EmpleadosService);
  private crd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargarProductosMasVendidos();
    this.cargarGananciasPorMes();
    this.cargarTopClientes();
    this.cargarUltimosEmpleados();
  }

  cargarProductosMasVendidos(): void {
    this.dashboardService.obtenerProductosMasVendidos().subscribe(data => {
      this.productosMasVendidos = data;
      this.crd.markForCheck();
    });
  }

  cargarGananciasPorMes(): void {
    this.dashboardService.obtenerGananciasPorMes().subscribe(data => {
      this.gananciasPorMes = data;
      this.ventasData.labels = data.map((d: { Mes: any; Anio: any; }) => `${d.Mes} ${d.Anio}`);
      this.ventasData.datasets[0].data = data.map((d: { Ganancia: any; }) => d.Ganancia);
      this.crd.markForCheck();
    });
  }
  cargarTopClientes(): void {
    this.clienteInfoService.mostrarClientes().subscribe(data => {
      this.topClientes = data.slice(0, 5);
      this.crd.markForCheck();
    });
  }
  cargarUltimosEmpleados(): void {
    this.empleadosService.mostrarEmpleados().subscribe(data => {
      this.ultimosEmpleados = data.slice(-3);
      this.crd.markForCheck();
    });
  }
}

