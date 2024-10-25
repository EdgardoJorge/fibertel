import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../shared/models/producto';
import { ProductoService } from '../../../../shared/services/producto.service';
import { IndexedDBService } from '../../../../shared/services/indexed-db.service';
import { CarritoService } from '../../../../shared/services/carrito.service';
import { Carrito } from '../../../../shared/models/carrito';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  cargaDatos: 'none' | 'loading' | 'done' | 'error' = 'none';
  carritoIds: string[] = [];
  productos: Producto[] = [];
  listcarrito: Carrito[] = [];
  cantidades: { [key: string]: number } = {};
  total: number = 0;

  constructor(
    private productoService: ProductoService,
    public carritoService:CarritoService,
  ) {}

  ngOnInit(): void {
    this.getlistcarrito()
  }
  getlistcarrito(): void {
    this.listcarrito = this.carritoService.getcarrito();
    console.log('Cart items:', this.listcarrito); // Optional: log to check if items are fetched
  }
}
