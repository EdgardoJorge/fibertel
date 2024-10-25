import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../../shared/models/producto';
import { ProductoService } from '../../../../shared/services/producto.service';
import { Marca } from '../../../../shared/models/marca';
import { MarcaService } from '../../../../shared/services/marca.service';
import { Categoria } from '../../../../shared/models/Categoria';
import { CategoriaService } from '../../../../shared/services/Categoria.service';
import { IndexedDBService } from '../../../../shared/services/indexed-db.service';
import { CarritoService } from '../../../../shared/services/carrito.service';
import { Carrito } from '../../../../shared/models/carrito';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  cargaDatos: 'none' | 'loading' | 'done' | 'error' = 'none';
  producto!: Producto;
  marca!: Marca;
  categoria!: Categoria; // Add this line to your component class
  productoAnadido: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private carritoService : CarritoService,
  ) {}

  ngOnInit(): void {
    this.cargaDatos = 'loading';
   ;

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.obtenerProducto(id);
      } else {
        this.cargaDatos = 'error';
      }
    });
  }

  obtenerProducto(id: string): void {
    this.productoService.getProductoById(id).subscribe({
      next: (data: Producto) => {
        this.producto = data;
        this.cargaDatos = 'done';
        this.obtenerMarca(this.producto.idMarca.toString());
        this.obtenerCategoria(this.producto.idCategoria.toString());
      },
      error: () => {
        this.cargaDatos = 'error';
      }
    });
  }

  obtenerMarca(idMarca: string): void {
    this.marcaService.getMarcaById(idMarca).subscribe({
      next: (data: Marca) => {
        this.marca = data;
      },
      error: () => {
        console.error('Error al obtener la marca');
      }
    });
  }

  obtenerCategoria(idCategoria: string): void {
    this.categoriaService.getCategoriaById(idCategoria).subscribe({
      next: (data: Categoria) => {
        this.categoria = data;
      },
      error: () => {
        console.error('Error al obtener categoría');
      }
    });
  }

  agregarProducto(item: Producto) {
    if (item) {
      this.carritoService.agregar(item, 1); // You can change the quantity as needed
      this.productoAnadido = true;
      console.log('Product added to cart:', item);
    } else {
      console.error('Product is not defined');
    }
  }
  
}
