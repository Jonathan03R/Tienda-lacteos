import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,MatSnackBarModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InventarioComponent implements OnInit {
  @ViewChild('productImageInput', { static: false }) productImageInput!: ElementRef;
  inventario$: Observable<Inventario[]>;
  productForm: FormGroup;
  editProductForm: FormGroup;
  selectedProduct: Inventario | null = null;
  categorias: Categoria[] = [];
  currentImage: string | null = null;

  productosFiltrados: Inventario[] = []; 
  filterProperty: string = '';

  alertMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
    
  ) {
    this.productForm = this.fb.group({
      ProductoNombre: ['', [Validators.required, Validators.minLength(3)]],
      ProductoDescripcion: ['', Validators.required],
      ProductoPrecio:[0, [Validators.required, Validators.min(1)]],
      ProductoCantidad: [0, [Validators.required, Validators.min(1)]],
      Producto_TipoProductoCodigo: [0, Validators.required],
      image: [null, Validators.required], 
    });

    this.editProductForm = this.fb.group({
      ProductoNombre: ['', [Validators.required, Validators.minLength(3)]],
      ProductoDescripcion: ['', Validators.required],
      ProductoPrecio: [0, [Validators.required, Validators.min(1)]],
      ProductoCantidad: [0,  [Validators.required, Validators.min(1)]],
      Producto_TipoProductoCodigo: [0, Validators.required],
      ProductoFoto: [null, Validators.required],
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
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.currentImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  this.productForm.patchValue({
    image: file,
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

  resetFileInput(): void {
    if (this.productImageInput) {
      this.renderer.setProperty(this.productImageInput.nativeElement, 'value', '');
    }
    this.currentImage = null;
  }

  ok(): void{
    this.snackBar.open('Por favor complete todos los campos requeridos correctamente.', 'Cerrar', {
      duration: 3000,
      
    });
  }
  onSubmit(): void {

    if (this.productForm.invalid) {
      this.snackBar.open('Por favor complete todos los campos requeridos correctamente.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'end' // 'start', 'center', 'end', 'left', 'right'
      });
      return;
    }

    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach((key) => {
      formData.append(key, this.productForm.get(key)?.value);
    });

    this.inventarioService.agregarProducto(formData).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        this.inventarioService.actualizarInventario();
        this.productForm.reset();
        this.resetFileInput();
        alert('Producto agregado')
        
      },
      (error) => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  onEditSubmit(): void {
    if (this.selectedProduct) {
      const formData = this.editProductForm.value;
      delete formData.ProductoFoto; 
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
