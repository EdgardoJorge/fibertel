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
    const ids = localStorage.getItem('carritoIds');
    this.carritoIds = ids ? JSON.parse(ids) : [];
  }

  // Obtener los IDs del carrito
  getCarritoIds(): string[] {
    return this.carritoIds;
  }

  // Añadir un ID al carrito
  agregarAlCarrito(id: string): void {
    if (!this.carritoIds.includes(id)) {
      this.carritoIds.push(id);
      localStorage.setItem('carritoIds', JSON.stringify(this.carritoIds));
    }
  }
  setCarritoIds(ids: string[]): void {
    localStorage.setItem('carritoIds', JSON.stringify(ids));
}

  
}
