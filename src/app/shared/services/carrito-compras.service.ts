import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Array privado para almacenar los IDs de los productos en el carrito
  private carritoIds: string[] = [];

  constructor() {
    this.cargarCarrito(); // Cargar el carrito desde Local Storage al iniciar el servicio
  }
  // Método privado para cargar los IDs del carrito desde Local Storage
  private cargarCarrito(): void {
    // Intenta obtener los IDs del carrito desde Local Storage
    const ids = localStorage.getItem('carritoIds');
    // Si se encontraron IDs, los parsea y los asigna al array carritoIds, si no, inicializa un array vacío
    this.carritoIds = ids ? JSON.parse(ids) : [];
  }
  // Método público para obtener los IDs actuales del carrito
  getCarritoIds(): string[] {
    // Devuelve el array de IDs
    return this.carritoIds;
  }
  // Método para agregar un ID al carrito
  agregarAlCarrito(id: string): void {
    // Verifica si el ID ya está en el carrito
    if (!this.carritoIds.includes(id)) {
      // Si no está, lo agrega al array
      this.carritoIds.push(id);
      // Guarda el carrito actualizado en Local Storage
      localStorage.setItem('carritoIds', JSON.stringify(this.carritoIds));
    }
  }
}
