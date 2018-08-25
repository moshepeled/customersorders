import { Order, Item } from './../../shared/order';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  _order: Order;
  orders: Order[];
  _orderid: string;

  items = [];

  @Input()
  set order(order: Order) {
    this._order = order;
    if (order) {
      console.log('input order');
      console.log(order);

      this.initItems();
      this.items.map((item, i) => {
        order.item.forEach(elem => {
          if (elem.name === item.name) {
            item.count = elem.count;
          }
        });
      });
      this._orderid = order.id;
    }

  }

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.initItems();
  }

  addOrder() {
    const now: Date = new Date();
    const newID: string = now.getTime().toString();

    let newOrder = new Order(this._order);
    newOrder.id = newID;
    this.items.filter(val => val.count > 0).map(data => {
      newOrder.additem(<Item>data);
    });
    this.orderService.sendOrder(newOrder);
    this.initItems();
  }

  
  saveOrder() {

    let existOrder = new Order(this._order);
    console.log('existOrder');
    console.log(existOrder);
    this.items.filter(val => val.count == 0).map(data => {
      existOrder.item.forEach((element, i) => {
        if (element.name === data.name) {
          existOrder.item.slice(i);
        }
      })
    });


    this.items.filter(val => val.count > 0).map(data => {
      let itemFound = false;
      existOrder.item.forEach((element, i) => {
        if (element.name === data.name) {
          existOrder.item[i].count = data.count;
          itemFound = true;
        }
      })
      if (!itemFound) {
        existOrder.additem(<Item>data);
      }
    });
    this.orderService.sendOrder(existOrder);
    this.initItems();
    // let customer = new Customer();
    // customer = this.localstorage.getItem(this.customerid);
    // customer.orders = customer.orders.filter(item => item.id !== this._orderid);
    // customer.orders.push(this.createOrder(this._orderid));
    // this.localstorage.setItem(this.customerid, customer);
    // this.initItems();
    // this.callBack('save');
  }

  delOrder() {

    let existOrder = new Order(this._order);
    // existOrder.id = '0';
    existOrder.item = [];
    this.orderService.sendOrder(existOrder);
    // let customer = new Customer();
    // customer = this.localstorage.getItem(this.customerid);
    // customer.orders = customer.orders.filter(item => item.id !== this._orderid);
    // this.localstorage.setItem(this.customerid, customer);
    this.initItems();
    // this.callBack('delete');
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

  // callBack(data: string) {
  //   this.parback.emit(data);
  // }
}
