import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../shared/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private subject = new Subject<any>();

  constructor() { }

  sendCustomer(customer: Customer) {
    this.subject.next(customer);
  }

  sendNewCustomer(customer: Customer) {
    customer.id = 0;
    this.subject.next(customer);
  }

  deleteCustomer(customer: Customer) {
    customer.firstName = '';
    customer.lastName = '';
    customer.cellular = '';
    this.subject.next(customer);
  }

  clearCustomer() {
    this.subject.next();
  }

  getCustomer(): Observable<Customer> {
    return this.subject.asObservable();
  }

}
