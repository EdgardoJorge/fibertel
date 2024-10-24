/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CategoriaService } from './Categoria.service';

describe('Service: Categoria', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaService]
    });
  });

  it('should ...', inject([CategoriaService], (service: CategoriaService) => {
    expect(service).toBeTruthy();
  }));
});
