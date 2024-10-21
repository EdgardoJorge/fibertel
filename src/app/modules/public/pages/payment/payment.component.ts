import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentData = {
    ItemTitle: 'Producto de prueba',
    ItemPrice: 100.00,
    ItemQuantity: 1
  };

  constructor(private http: HttpClient) {}

  createPayment(event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Llama a tu backend para crear la preferencia de pago
    this.http.post('http://localhost:5251/api/store/payments/create-preference', this.paymentData)
      .subscribe((response: any) => {
        // Redirige al usuario a la URL de inicio de pago
        window.location.href = response.initPoint; // Usar el initPoint de la respuesta
      }, error => {
        console.error('Error al crear la preferencia de pago:', error);
      });
  }
}

