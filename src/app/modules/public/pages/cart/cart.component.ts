import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../../../shared/services/carrito.service';
import { Carrito } from '../../../../shared/models/carrito';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public carritoService = inject(CarritoService);
  listcarrito: Carrito[] = [];

  ngOnInit(): void {
    this.getlistcarrito(); // Call the method to fetch the cart items
  }

  getlistcarrito(): void {
    this.listcarrito = this.carritoService.getcarrito();
    console.log('Cart items:', this.listcarrito); // Optional: log to check if items are fetched
  }

  eliminaritem(index: number): void {
    this.carritoService.eliminar(index); // Call the eliminar method from the service
    this.getlistcarrito(); // Refresh the cart items after deletion
  }

  increment(item: Carrito): void {
    if (item.cantidad < 7) {
      item.cantidad++;
      this.carritoService.actualizar(this.carritoService.getcarrito().indexOf(item), item.cantidad);
    }
  }
  
  decrement(item: Carrito): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.actualizar(this.carritoService.getcarrito().indexOf(item), item.cantidad);
    }
  }

  actualizar(item: Carrito, index: number): void {
    this.carritoService.actualizar(index, item.cantidad);
  }

  getItemIndex(item: Carrito): number {
    return this.listcarrito.indexOf(item);
  }
}
