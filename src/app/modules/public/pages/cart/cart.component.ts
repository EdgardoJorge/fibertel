// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../../shared/services/carrito.service';
import { ProductoService } from '../../../../shared/services/producto.service';
import { Producto } from '../../../../shared/models/producto';
import { IndexedDBService } from '../../../../shared/services/indexed-db.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carritoIds: string[] = [];
  productos: Producto[] = [];
  cantidades: { [key: string]: number } = {};

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private indexedDBService: IndexedDBService
  ) {}

  ngOnInit(): void {
    this.carritoIds = this.carritoService.getCarritoIds();
    this.cargarCantidadesDesdeIndexedDB();
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productos = [];
    for (const id of this.carritoIds) {
      this.productoService.getProductoById(id).subscribe({
        next: (producto: Producto) => {
          this.productos.push(producto);
          if (!(id in this.cantidades)) {
            this.cantidades[id] = 1;
          }
        },
        error: () => {
          console.error('Error al cargar el producto con ID:', id);
        }
      });
    }
  }

  cargarCantidadesDesdeIndexedDB(): void {
    this.indexedDBService.get('cantidades').then(cantidades => {
      if (cantidades) {
        this.cantidades = cantidades;
      }
    });
  }

  guardarCantidadesEnIndexedDB(): void {
    this.indexedDBService.set('cantidades', this.cantidades);
    this.guardarTotalEnIndexedDB();
  }

  guardarTotalEnIndexedDB(): void {
    const total = this.calcularTotal();
    this.indexedDBService.set('totalCarrito', total);
  }

  calcularTotal(): string {
    const total = this.productos.reduce((total, producto) => {
      const cantidad = this.cantidades[producto.idProducto.toString()] || 1;
      return total + (producto.precioOferta || producto.precio) * cantidad;
    }, 0);
    return `${total.toFixed(2)}`;
  }

  calcularTotalProductos(): number {
    return Object.values(this.cantidades).reduce((total, cantidad) => total + cantidad, 0);
  }

  eliminarDelCarrito(productoId: string): void {
    this.carritoIds = this.carritoIds.filter(id => id !== productoId);
    delete this.cantidades[productoId];
    this.carritoService.setCarritoIds(this.carritoIds);
    this.guardarCantidadesEnIndexedDB();
    this.cargarProductos();
  }

  mas(productoId: string) {
    if (this.cantidades[productoId] < 7) {
      this.cantidades[productoId]++;
      this.guardarCantidadesEnIndexedDB(); // Add this line to save the quantities to IndexedDB
    }
  }

  menos(productoId: string) {
    if (this.cantidades[productoId] > 1) {
      this.cantidades[productoId]--;
      this.guardarCantidadesEnIndexedDB(); // Add this line to save the quantities to IndexedDB
    }
  }
}
