/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarritoComprasService } from './carrito-compras.service';

describe('Service: CarritoCompras', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarritoComprasService]
    });
  });

  it('should ...', inject([CarritoComprasService], (service: CarritoComprasService) => {
    expect(service).toBeTruthy();
  }));
});
