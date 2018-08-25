import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Order } from '../shared/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private subject = new Subject<any>();

  constructor() { }

  sendOrder(order: Order) {
    this.subject.next(order);
  }

  sendNewOrder(order: Order) {
    const now: Date = new Date();
    order.id =  now.getTime().toString();;
    this.subject.next(order);
  }

  deleteOrder(order: Order) {
    order.id = '0';
    this.subject.next(order);
  }

  clearOrder() {
    this.subject.next();
  }

  getOrder(): Observable<Order> {
    return this.subject.asObservable();
  }
}
