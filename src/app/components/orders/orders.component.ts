import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../shared/order';
import { LocalStorageService } from '../../models/local-storage.service';
import { Customer } from '../../shared/customer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order: Order;
  orderid: string;
  orders: Order[] = [];
  customer: Customer;
  _customerid;

  @Output()
  parback: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  set customerid(customerid: string) {
    if (customerid !== '0') {
      this._customerid = customerid;
      this.customer = this.localstorage.getItem(customerid);
    }
  }

  constructor(private localstorage: LocalStorageService) {}

  ngOnInit() {}

  editOrder(id) {
    console.log(this.customerid);
    this.orderid = id;
  }

  callBack(data: string) {
    console.log('orders ' + data);
    this.customer = this.localstorage.getItem(this._customerid);
    this.parback.emit(data);
  }
}
