import { Component, OnInit } from '@angular/core';
// import { Producto } from '../../shared/models/producto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  {
  // estadoCarga: 'none' | 'loading' | 'done' | 'error' = "none";
  // estadoCreacion: 'none' | 'loading' | 'done' | 'error' = "none";
  // productos: Producto[] = [];
    
  // ngOnInit(): void {
  //   this.listarTodos();
  // }

  // listarTodos() {
  //   this.estadoCarga = 'loading';
  //   this.ProductoService.obtenerTodosLosProductos()
  //     .subscribe({
  //       next: (data) => {
  //         this.estadoCarga = 'done';
  //         this.productos = data;
  //       },
  //       error: () => {
  //           this.estadoCarga = 'error';
  //       }
  //     });
  // }
}