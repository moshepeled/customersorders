import { Order, Item } from './../../shared/order';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../models/local-storage.service';
import { Customer } from '../../shared/customer';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customer: Customer;
  order: Order;
  orders: Order[];
  _orderid: string;

  items = [];

  @Output()
  parback: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  customerid: string;

  @Input()
  set orderid(orderid: string) {
    this._orderid = orderid;
    if (orderid !== '0' && orderid !== '') {
      this.customer = this.localstorage.getItem(this.customerid);

      // tslint:disable-next-line:no-shadowed-variable
      this.customer.orders.forEach(element => {
        if (element.id === orderid) {
          this.initItems();
          this.items.map((item, i) => {
            // console.log(item, i);
            element.item.forEach(elem => {
              if (elem.name === item.name) {
                item.count = elem.count;
              }
            });
          });
          // console.log(this.items);
        }
      });
    }
  }

  constructor(private localstorage: LocalStorageService) {}

  ngOnInit() {
    this.initItems();
  }

  addOrder() {
    const now: Date = new Date();
    const newID: string = now.getTime().toString();

    // tslint:disable-next-line:prefer-const
    let newOrder = new Order(newID, this.customerid);

    this.items.filter(val => val.count > 0).map(data => {
      // console.log(data);
      newOrder.additem(<Item>data);
    });

    let customer = new Customer();
    customer = this.localstorage.getItem(this.customerid);
    customer.orders.push(newOrder);
    this.localstorage.setItem(this.customerid, customer);
    this.initItems();
    this.callBack('add');
  }

  createOrder(newID) {
    // tslint:disable-next-line:prefer-const
    let newOrder = new Order(newID, this.customerid);
    this.items.filter(val => val.count > 0).map(data => {
      newOrder.additem(<Item>data);
    });
    return newOrder;
  }

  saveOrder() {
    let customer = new Customer();
    customer = this.localstorage.getItem(this.customerid);
    customer.orders = customer.orders.filter(item => item.id !== this._orderid);
    customer.orders.push(this.createOrder(this._orderid));
    this.localstorage.setItem(this.customerid, customer);
    this.initItems();
    this.callBack('save');
  }

  delOrder() {
    let customer = new Customer();
    customer = this.localstorage.getItem(this.customerid);
    customer.orders = customer.orders.filter(item => item.id !== this._orderid);
    this.localstorage.setItem(this.customerid, customer);
    this.initItems();
    this.callBack('delete');
  }

  initItems() {
    this.items = [
      { name: 'apple', count: 0 },
      { name: 'banana', count: 0 },
      { name: 'cherry', count: 0 },
      { name: 'coconut', count: 0 },
      { name: 'grapefruit', count: 0 },
      { name: 'kiwi', count: 0 },
      { name: 'lemon', count: 0 },
      { name: 'lime', count: 0 },
      { name: 'starfruit', count: 0 },
      { name: 'strawberry', count: 0 },
      { name: 'maracuja', count: 0 },
      { name: 'watermelon', count: 0 }
    ];
  }

  callBack(data: string) {
    this.parback.emit(data);
  }
}
