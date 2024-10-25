import { Injectable } from '@angular/core';
import { Carrito } from '../models/carrito';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listcarrito: Carrito[] = [];

  getcarrito() {
    this.obtenerSession(); // Ensure we always get the latest session data
    return this.listcarrito;
  }

  agregar(producto: Producto, cantidad: number = 1) {
    this.obtenerSession(); // Make sure we have the latest data
    const index = this.listcarrito.findIndex(item => item.producto.idProducto === producto.idProducto);
    
    if (index === -1) {
      const item = new Carrito(producto, cantidad);
      this.listcarrito.push(item);
    } else {
      // Update quantity if item already exists
      this.actualizar(index, this.listcarrito[index].cantidad + cantidad);
    }
    this.guardarSession(); // Save updated cart state
  }

  actualizar(index: number, cantidad: number) {
    if (index >= 0 && index < this.listcarrito.length) {
      this.listcarrito[index].cantidad = cantidad;
      this.guardarSession(); // Save updated cart state
    }
  }

  cantidad(): number {
    this.obtenerSession(); // Ensure we have the latest session data
    return this.listcarrito.reduce((total, item) => total + item.cantidad, 0);
  }

  total(): number {
    this.obtenerSession(); // Ensure we have the latest session data
    return this.listcarrito.reduce((sum, item) => {
      const precio = item.producto.precioOferta === 0 ? item.producto.precio : item.producto.precioOferta;
      return sum + precio * item.cantidad;
    }, 0);
  }

  eliminar(index: number) {
    if (index >= 0 && index < this.listcarrito.length) {
      this.listcarrito.splice(index, 1);
      this.guardarSession(); // Save updated cart state
    }
  }

  guardarSession() {
    localStorage.setItem('Carrito', JSON.stringify(this.listcarrito));
  }

  obtenerSession() {
    this.listcarrito = []; // Clear the existing list
    if (typeof window !== 'undefined' && window.localStorage) {
      const carrito = localStorage.getItem('Carrito');
      if (carrito != null) {
        this.listcarrito = JSON.parse(carrito);
      }
    }
  }
}
