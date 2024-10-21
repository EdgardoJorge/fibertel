/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetallePedidoService } from './detallePedido.service';

describe('Service: DetallePedido', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetallePedidoService]
    });
  });

  it('should ...', inject([DetallePedidoService], (service: DetallePedidoService) => {
    expect(service).toBeTruthy();
  }));
});
