import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Order } from '../../shared/order';
import { LocalStorageService } from '../../models/local-storage.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  
  order: Order;
  _orders: Order[] = [];
  custorders: Order[] = [];
  subscription: Subscription;
  _customerid: number;
  
  @Input()
  set customerid(customerid: number) {
    this._customerid = customerid;
  }

  @Input()
  set orderids(orderids: String[]) {
    this._orders = this.ls.getCustomerOrders(orderids);
    console.log('_orders:');
    console.log(this._orders);
  }

  constructor(private ls: LocalStorageService
    , private orderService: OrderService) {}

  ngOnInit() {
    this.subscription = this.orderService.getOrder().subscribe(ord => {
      if (!ord.customerid) { // new order
        ord.customerid = this._customerid;
        console.log('addOrder:');
        console.log(ord);
        this.ls.addOrder(ord);
        if (this._orders) {
          this._orders.push(ord);
        } else {
          this._orders =[];
          this._orders.push(ord);
        }
        return;
      }

      if (ord.item.length > 0) { // update
        this.ls.saveOrder(ord);
        return;
      } else {
        this.ls.delOrder(ord);
        this._orders = this._orders.filter(o => o.id !== ord.id);
      }

    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editOrder(order: Order) {
    console.log('click ');
    console.log(order);
    this.order = order;
  }
}
