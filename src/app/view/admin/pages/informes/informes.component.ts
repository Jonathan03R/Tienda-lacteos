import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { InformesService } from '../../../../controller/service/informes/informes.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ChartData, ChartOptions, ChartTypeRegistry, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';


import { Chart } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [
    CommonModule , BaseChartDirective 
  ],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class InformesComponent { 

  productosBajoStock: any[] = [];
  ventasPorCliente: any[] = [];
  ventasPorMes: any[] = [];


  private informesService = inject(InformesService);
  private crd = inject(ChangeDetectorRef);

  ventasData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Total Ventas' },
      { data: [], label: 'Ganancia' }
    ]
  };

  ventasOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        type: 'category', 
      },
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnInit(): void {
    this.cargarProductosBajoStock();
    this.cargarVentasPorCliente();
    this.cargarVentasPorMes();
  }

  cargarProductosBajoStock(): void {
    this.informesService.obtenerProductosConBajoStock().subscribe(data => {
      this.productosBajoStock = data;
      this.crd.markForCheck();
    });
  }

  cargarVentasPorCliente(): void {
    this.informesService.obtenerVentasPorCliente().subscribe(data => {
      this.ventasPorCliente = data;
      this.crd.markForCheck();
    });
  }

  cargarVentasPorMes(): void {
    this.informesService.obtenerVentasPorMes().subscribe(data => {
      this.ventasPorMes = data; 
      this.ventasData.labels = data.map(d => `${d.Anio}-${d.Mes}`);
      this.ventasData.datasets[0].data = data.map(d => d.TotalVentas);
      this.ventasData.datasets[1].data = data.map(d => d.Ganancia);
      this.crd.markForCheck();
    });
  }


  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  exportChartDataToExcel(): void {
    const data = this.ventasPorMes.map(item => ({
      Anio: item.Anio,
      Mes: item.Mes,
      NumeroPedidos: item.NumeroPedidos,
      TotalVentas: item.TotalVentas,
      Ganancia: item.Ganancia
      
    }));
    this.exportToExcel(data, 'VentasPorMes');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';






