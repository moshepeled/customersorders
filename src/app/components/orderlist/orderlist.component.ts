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
  selectedID = 0;

  constructor(private localstorage: LocalStorageService) {}

  ngOnInit() {
    this.arrangOrders();
  }

  arrangOrders() {
    this.customers = this.localstorage.getAllItems();
    this.orders = [];
    this.customers.forEach(element => {
      if (element.orders) {
        element.orders.forEach(ord => {
          // console.log(ord);
          this.orders.push(ord);
        });
      }
    });
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

  onClickEdit(customerid) {
    this.selectedID = customerid;
  }

  callBack(data: string) {
    console.log('orderlist ' + data);
    this.arrangOrders();
  }
}
