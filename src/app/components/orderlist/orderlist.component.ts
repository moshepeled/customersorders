import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../models/local-storage.service';
import { Customer } from '../../shared/customer';
import { Order } from '../../shared/order';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  customers: Array<Customer>;
  orders: Array<Order> = [];
  customer: Customer;

  constructor(private localstorage: LocalStorageService) {}

  ngOnInit() {
    this.arrangOrders();
  }

  arrangOrders() {
    this.orders = this.localstorage.getAllOrders();
    this.orders.sort(
      (a, b): number => {
        if (Number(a.id) > Number(b.id)) {
          return -1;
        }
        if (Number(a.id) < Number(b.id)) {
          return 1;
        }
        return 0;
      }
    );
  }

  onClickEdit(order: Order) {
    this.customer = this.localstorage.getCustomer(order.customerid);
    console.log(this.customer);
    
  }

  callBack(data: string) {
    console.log('orderlist ' + data);
    this.arrangOrders();
  }
}
