import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createCheckoutSession(planType: string): Observable<{url: string}> {
    return this.http.post<{url: string}>(`${environment.apiUrl}/payment/create-checkout-session`, 
      { planType });
  }

  confirmPayment(sessionId: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/payment/success?sessionId=${sessionId}`, {});
  }
}