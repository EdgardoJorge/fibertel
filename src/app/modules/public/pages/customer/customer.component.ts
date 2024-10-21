import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { RucService } from '../../services/ruc.service';
import { DniService } from '../../services/dni.service'; 

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  switchState: boolean = false; // Estado inicial del switch
  rucData: any; // Para almacenar los datos del RUC
  dniData: any; // Para almacenar los datos del DNI
  noResultsDNI: boolean = false; // Variable para controlar si hay resultados
  noResultsRUC: boolean = false;

  constructor(private rucService: RucService, private dniService: DniService, private router: Router) {} // Inyecta el Router

  // Método para obtener datos del RUC
  fetchRucData(ruc: string) {
    this.rucService.getRucData(ruc).subscribe({
      next: (data) => {
        if (data && (data.razonSocial || data.ruc)) {
          this.rucData = data; 
          this.noResultsRUC = false;
        } else {
          this.rucData = null;
          this.noResultsRUC = true;
        }
        console.log(this.rucData);
      },
      error: (error) => {
        console.error('Error al obtener datos del RUC:', error);
        this.rucData = null;
        this.noResultsRUC = true;
      }
    });
  }

  // Método para obtener datos del DNI
  fetchDniData(dni: string) {
    this.dniService.getDniData(dni).subscribe({
      next: (data) => {
        if (data && (data.dni || data.nombres || data.apellidoPaterno || data.apellidoMaterno || data.codVerifica)) {
          this.dniData = data;
          this.noResultsDNI = false;
        } else {
          this.dniData = null;
          this.noResultsDNI = true;
        }
        console.log(this.dniData);
      },
      error: (error) => {
        console.error('Error al obtener datos del DNI:', error);
        this.dniData = null;
        this.noResultsDNI = true;
      }
    });
  }

  // Método para continuar a la siguiente vista
  continue() {
    if (this.rucData || this.dniData) { // Verifica si hay datos disponibles
      this.router.navigate(['/recorrido/locacion']); // Navega a la vista de locación
    } else {
      alert("Por favor, completa tus datos primero."); // Mensaje de error si no hay datos
    }
  }
}
