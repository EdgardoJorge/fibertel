// summary.component.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../../shared/services/carrito.service';
import { Producto } from '../../../../shared/models/producto';
import { ProductoService } from '../../../../shared/services/producto.service';
import { IndexedDBService } from '../../../../shared/services/indexed-db.service'; // Import the new service

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  cargaDatos: 'none' | 'loading' | 'done' | 'error' = 'none';
  carritoIds: string[] = [];
  productos: Producto[] = [];
  cantidades: { [key: string]: number } = {};
  total: number = 0;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private indexedDBService: IndexedDBService // Inject the new service
  ) {}

  ngOnInit(): void {
    this.carritoIds = this.carritoService.getCarritoIds();
    this.cargarCantidadesDesdeIndexedDB();
    this.cargarProductos();
  }

  cargarCantidadesDesdeIndexedDB(): void {
  this.indexedDBService.get('cantidades').then(cantidades => {
    if (cantidades) {
      this.cantidades = cantidades;
      console.log('Cantidades cargadas desde IndexedDB:', this.cantidades); // Add this line for debugging
    } else {
      console.log('No hay cantidades en IndexedDB'); // Add this line for debugging
    }
  });
}

  

  cargarProductos(): void {
    this.cargaDatos = 'loading';
    this.productos = [];

    const productRequests = this.carritoIds.map(id =>
      this.productoService.getProductoById(id).toPromise().catch(err => {
        console.error('Error al obtener el producto con ID:', id, err);
        return undefined;
      })
    );

    Promise.all(productRequests)
      .then(productos => {
        this.productos = productos.filter((producto): producto is Producto => producto !== undefined);
        if (this.productos.length === 0) {
          console.warn('No se encontraron productos en el carrito.');
        }
        this.calcularTotal();
        this.cargaDatos = 'done';
      })
      .catch(() => {
        console.error('Error al cargar los productos.');
        this.cargaDatos = 'error';
      });
  }

  calcularTotalProductos(): number {
    return Object.values(this.cantidades).reduce((total, cantidad) => total + cantidad, 0);
  }

  calcularTotal(): void {
    this.total = this.productos.reduce((total, producto) => {
      const cantidad = this.cantidades[producto.idProducto.toString()] || 1;
      return total + (producto.precioOferta || producto.precio) * cantidad;
    }, 0);
  }
}
