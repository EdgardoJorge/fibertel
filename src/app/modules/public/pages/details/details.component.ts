import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../../shared/models/producto';
import { ProductoService } from '../../../../shared/services/producto.service'; 
import { Marca } from '../../../../shared/models/marca';
import { MarcaService } from '../../../../shared/services/marca.service';
import { Categoria } from '../../../../shared/models/Categoria';
import { CategoriaService } from '../../../../shared/services/Categoria.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  cargaDatos: 'none' | 'loading' | 'done' | 'error' = 'none';
  producto!: Producto; // Producto actual
  marca!: Marca; // Marca del producto
  categoria!: Categoria; // Categoria del producto
  carritoIds: string[] = []; // IDs de productos en el carrito
  productoAnadido: boolean = false; // Indica si el producto fue añadido al carrito

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private categoriaService:CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargaDatos = 'loading';
    this.carritoIds = this.getCarritoIds(); // Carga los IDs del carrito

    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Obtiene el ID del producto de los parámetros
      if (id) {
        this.obtenerProducto(id);// Obtiene el producto por ID
      } else {
        this.cargaDatos = 'error'; // Cambia el estado a error si no hay ID
      }
    });
  }

 // Método para obtener un producto por su ID
 obtenerProducto(id: string): void {
  this.productoService.getProductoById(id).subscribe({
    next: (data: Producto) => {
      this.producto = data; // Asigna el producto obtenido
      this.cargaDatos = 'done'; // Cambia el estado de carga a 'done'
      // Obtiene la marca y categoría del producto
      this.obtenerMarca(this.producto.idMarca.toString());
      this.obtenerCategoria(this.producto.idCategoria.toString());
    },
    error: () => {
      this.cargaDatos = 'error'; // Cambia el estado a error si hay un fallo
    }
  });
}

// Método para obtener la marca por su ID
obtenerMarca(idMarca: string): void {
  this.marcaService.getMarcaById(idMarca).subscribe({
    next: (data: Marca) => {
      this.marca = data; // Asigna la marca obtenida
    },
    error: () => {
      console.error('Error al obtener la marca'); // Muestra un error en la consola
    }
  });
}

// Método para obtener la categoría por su ID
obtenerCategoria(idCategoria: string): void {
  this.categoriaService.getCategoriaById(idCategoria).subscribe({
    next: (data: Categoria) => {
      this.categoria = data; // Asigna la categoría obtenida
    },
    error: () => {
      console.error('Error al obtener categoría'); // Muestra un error en la consola
    }
  });
}

// Método para agregar un producto al carrito
agregarAlCarrito(): void {
  if (this.producto.idProducto) {
    const carritoIds = this.getCarritoIds(); // Obtiene los IDs del carrito
    const idStr = this.producto.idProducto.toString(); // Convierte el ID a string

    // Verifica si el ID ya está en el carrito
    if (!carritoIds.includes(idStr)) {
      carritoIds.push(idStr); // Agrega el ID al carrito
      localStorage.setItem('carritoIds', JSON.stringify(carritoIds)); // Guarda en Local Storage
      this.productoAnadido = true; // Indica que se añadió el producto
      console.log('Producto añadido al carrito:', this.producto.idProducto); // Mensaje en consola
      
      // Oculta el mensaje después de 2 segundos
      setTimeout(() => {
        this.productoAnadido = false; 
      }, 2000);
    } else {
      console.log('El producto ya está en el carrito'); // Mensaje si ya estaba en el carrito
    }
  }
}

// Método para obtener los IDs del carrito desde Local Storage
getCarritoIds(): string[] {
  const ids = localStorage.getItem('carritoIds'); // Obtiene los IDs del Local Storage
  return ids ? JSON.parse(ids) : []; // Parse y devuelve o devuelve un array vacío
}
}