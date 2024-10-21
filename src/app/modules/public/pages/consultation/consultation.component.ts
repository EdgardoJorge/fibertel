import { Component, OnInit } from '@angular/core';
import { clientes } from '../../../../shared/models/clientes';
import { ClienteService } from '../../../../shared/services/Cliente.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  CargaDatos: 'none' | 'loading' | 'done' | 'error' = 'none'
  Clientes: clientes[]=[];
  constructor(
    private clienteService: ClienteService,
  ){}
  ngOnInit(): void {
    this.listAll();
  }
  listAll(){
    this.CargaDatos= 'loading';
    this.clienteService.list().subscribe({
      next: (data) =>{
        this.CargaDatos='done';
        this.Clientes=data;
      },
      error: (_) =>{
        this.CargaDatos='error'
      }
    })
    
    }
  }
