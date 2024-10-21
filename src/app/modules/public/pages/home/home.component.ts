import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../shared/services/producto.service';
import { Producto } from '../../../../shared/models/producto';
import { MarcaService } from '../../../../shared/services/marca.service';
import { Marca } from '../../../../shared/models/marca';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  CargaDatos : 'none' | 'loading' | 'done' | 'error'='none';
  CargaDatosMarca: 'none' | 'loading' | 'done' | 'error' = 'none';
  Productos: Producto[] = [];
  Marcas: Marca[] = [];

  constructor(private productoService:ProductoService,
    private marcaService:MarcaService
  ){}
  ngOnInit(): void {
    this.searchAll();
    this.SearchMarca();
  }
  searchAll(){
    this.CargaDatos = 'loading';
    this.productoService.list().subscribe({
      next: (data) =>{
        this.CargaDatos = 'done';
        this.Productos = data;
      },
      error: (_) => {
        this.CargaDatos= 'error';
      }
    });
  }
  SearchMarca(): void {
    this.CargaDatosMarca = 'loading';
    this.marcaService.list().subscribe({
      next: (data) => {
        this.CargaDatosMarca = 'done';
        this.Marcas = data.map(marca => ({
          ...marca,
          idMarcas: marca.idMarca.toString(),
        }));
      },
      error: (_) => {
        this.CargaDatosMarca = 'error';
      },
    });
  }
}
