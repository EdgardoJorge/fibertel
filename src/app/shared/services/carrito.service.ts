import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoIds: string[] = [];

  constructor() {
    this.cargarCarrito(); // Cargar el carrito desde Local Storage al iniciar el servicio
  }

  // Cargar los IDs desde Local Storage
  private cargarCarrito(): void {
    try {
      const ids = localStorage.getItem('carritoIds');
      this.carritoIds = ids ? JSON.parse(ids) : [];
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
      this.carritoIds = []; // Reiniciar a un array vacío en caso de error
    }
  }

  // Obtener los IDs del carrito
  getCarritoIds(): string[] {
    return this.carritoIds;
  }

  // Añadir un ID al carrito
  agregarAlCarrito(id: string): void {
    if (!this.carritoIds.includes(id)) {
      this.carritoIds.push(id);
      this.guardarCarritoEnStorage();
    }
  }

  // Establecer los IDs del carrito
  setCarritoIds(ids: string[]): void {
    this.carritoIds = ids; // Actualizar el array local
    this.guardarCarritoEnStorage();
  }

  // Guardar el carrito en Local Storage
  private guardarCarritoEnStorage(): void {
    try {
      localStorage.setItem('carritoIds', JSON.stringify(this.carritoIds));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }
}
