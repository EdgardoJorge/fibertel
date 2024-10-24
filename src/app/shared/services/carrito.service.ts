import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoIds: string[] = [];

  constructor() {
    this.cargarCarrito(); // Cargar el carrito desde sessionStorage al iniciar el servicio
  }

  // Cargar los IDs desde sessionStorage
  private cargarCarrito(): void {
    try {
      const ids = sessionStorage.getItem('carritoIds');
      this.carritoIds = ids ? JSON.parse(ids) : [];
      console.log('Carrito cargado:', this.carritoIds);
    } catch (error) {
      console.error('Error al cargar el carrito desde sessionStorage:', error);
      this.carritoIds = []; // Resetea el array en caso de error
    }
  }

  // Obtener los IDs del carrito
  getCarritoIds(): string[] {
    return this.carritoIds;
  }

  // Añadir un ID al carrito
  agregarAlCarrito(id: string): void {
    console.log('Agregando al carrito ID:', id);
    if (!this.carritoIds.includes(id)) {
      this.carritoIds.push(id);
      sessionStorage.setItem('carritoIds', JSON.stringify(this.carritoIds));
      console.log('Carrito actualizado:', this.carritoIds);
    } else {
      console.warn(`El ID ${id} ya está en el carrito.`);
    }
  }

  // Establecer IDs en el carrito
  setCarritoIds(ids: string[]): void {
    this.carritoIds = ids;
    sessionStorage.setItem('carritoIds', JSON.stringify(ids));
    console.log('Carrito establecido:', this.carritoIds);
  }
}
