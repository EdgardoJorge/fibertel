import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../../shared/services/carrito.service';
import { ProductoService } from '../../../../shared/services/producto.service';
import { Producto } from '../../../../shared/models/producto';

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
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.carritoIds = this.carritoService.getCarritoIds();
    this.cargarCantidadesDesdeStorage();
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productos = [];
    for (const id of this.carritoIds) {
      this.productoService.getProductoById(id).subscribe({
        next: (producto: Producto) => {
          this.productos.push(producto);
          this.cantidades[id] = this.cantidades[id] || 1;
        },
        error: () => {
          console.error('Error al cargar el producto con ID:', id);
        }
      });
    }
  }

  cargarCantidadesDesdeStorage(): void {
    try {
      const cantidadesGuardadas = localStorage.getItem('cantidades');
      if (cantidadesGuardadas) {
        this.cantidades = JSON.parse(cantidadesGuardadas);
      }
    } catch (error) {
      console.error('Error al cargar las cantidades desde localStorage:', error);
    }
  }

  guardarCantidadesEnStorage(): void {
    try {
      localStorage.setItem('cantidades', JSON.stringify(this.cantidades));
      this.guardarTotalEnStorage();
    } catch (error) {
      console.error('Error al guardar las cantidades en localStorage:', error);
    }
  }

  guardarTotalEnStorage(): void {
    const total = this.calcularTotal();
    localStorage.setItem('totalCarrito', total);
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
    localStorage.setItem('carritoIds', JSON.stringify(this.carritoIds));
    this.guardarCantidadesEnStorage();
    this.cargarProductos();
  }

  mas(productoId: string): void {
    if (this.cantidades[productoId] < 7) {
      this.cantidades[productoId]++;
      this.guardarCantidadesEnStorage();
    }
  }

  menos(productoId: string): void {
    if (this.cantidades[productoId] > 1) {
      this.cantidades[productoId]--;
      this.guardarCantidadesEnStorage();
    }
  }
}
