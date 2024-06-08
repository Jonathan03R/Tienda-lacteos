import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Categoria, Inventario } from '../../../../model/interface/inventario';
import { InventarioService } from '../../../../controller/service/inventario/inventario.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InventarioComponent implements OnInit {
  inventario$: Observable<Inventario[]>;
  productForm: FormGroup;
  editProductForm: FormGroup;
  selectedProduct: Inventario | null = null;
  categorias: Categoria[] = [];
  currentImage: string | null = null;

  productosFiltrados: Inventario[] = []; // Lista de productos filtrados
  filterProperty: string = '';

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService
  ) {
    this.productForm = this.fb.group({
      ProductoNombre: ['', Validators.required],
      ProductoDescripcion: ['', Validators.required],
      ProductoPrecio: [0, Validators.required],
      ProductoCantidad: [0, Validators.required],
      Producto_TipoProductoCodigo: [0, Validators.required],
      image: [null],
    });

    this.editProductForm = this.fb.group({
      ProductoNombre: ['', Validators.required],
      ProductoDescripcion: ['', Validators.required],
      ProductoPrecio: [0, Validators.required],
      ProductoCantidad: [0, Validators.required],
      Producto_TipoProductoCodigo: [0, Validators.required],
      ProductoFoto: [null],
    });
    this.inventario$ = this.inventarioService.obtenerInventario();
  }

  ngOnInit(): void {
    this.inventarioService.actualizarInventario();
    this.cargarCategorias();

    this.inventarioService.obtenerInventario().subscribe((inventario) => {
      this.productosFiltrados = inventario; // Inicializar con todos los productos
    });
    // this.inventario = this._servicioInvetario.obtenerInventario();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({
      image: file,
    });
    this.editProductForm.patchValue({
      ProductoFoto: file,
    });
  }

  cargarCategorias(): void {
    this.inventarioService.obtenerCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  trackByFn(index: number, item: Inventario) {
    return item.ProductoCodigo;
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach((key) => {
      formData.append(key, this.productForm.get(key)?.value);
    });

    this.inventarioService.agregarProducto(formData).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        this.inventarioService.actualizarInventario();
      },
      (error) => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  onEditSubmit(): void {
    if (this.selectedProduct) {
      const formData = this.editProductForm.value;
      delete formData.ProductoFoto; // Remover el campo ProductoFoto
      this.inventarioService
        .modificarInventario({
          ...formData,
          ProductoCodigo: this.selectedProduct.ProductoCodigo,
        })
        .subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
            this.inventarioService.actualizarInventario();
            document.getElementById('editModal')?.click();
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
    }
  }

  editItem(item: Inventario): void {
    this.selectedProduct = item;
    this.currentImage = item.ProductoFoto;
    this.setEditFormValues(item);
    document.getElementById('editModal')?.click();
  }

  setEditFormValues(item: Inventario): void {
    this.editProductForm.patchValue({
      ProductoNombre: item.ProductoNombre,
      ProductoDescripcion: item.ProductoDescripcion,
      ProductoPrecio: item.ProductoPrecio,
      ProductoCantidad: item.ProductoCantidad,
      Producto_TipoProductoCodigo: this.getCategoriaCodigo(item.Categoria),
      ProductoFoto: null, // No establecer la foto aquí para evitar sobreescribirla
    });
  }
  getCategoriaCodigo(categoriaNombre: string): number {
    const categoria = this.categorias.find(
      (cat) => cat.TipoProductoNombre === categoriaNombre
    );
    return categoria ? categoria.TipoProductoCodigo : 0;
  }

  filtrarProductos() {
    this.inventarioService.obtenerInventario().subscribe((inventario) => {
      this.productosFiltrados = inventario.filter((producto) =>
        producto.ProductoNombre.toLowerCase().includes(
          this.filterProperty.toLowerCase()
        )
      );
    });
  }
}
