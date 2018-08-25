import { Injectable } from '@angular/core';
import { Customer } from '../shared/customer';
import { Order } from '../shared/order';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  lsName = 'customerorders/';
  dbCustomers = 'customers';
  dbOrders = 'orders';
  constructor() {
  }

  clear() {
    localStorage.clear();
  }

  getCustomers(): Array<Customer> {
    const values = [];
    let customers = <Array<Customer>>JSON.parse(localStorage.getItem(this.dbCustomers));
    if (customers) {    
      customers.forEach(element => {
        values.push(element);
      });
    }
    return values
  }

  delCustomer(customer) {
    let customers = JSON.parse(localStorage.getItem(this.dbCustomers));
    if (customers) {
      customers = customers.filter(data => data.id !== customer.id);
      localStorage.setItem(this.dbCustomers, JSON.stringify(customers));
    }
  }

  saveCustomer(customer) {
    const values = [];
    let customers = JSON.parse(localStorage.getItem(this.dbCustomers));
    if (customers) {
      customers.map((cust, i) => {
        if (cust.id == customer.id) {
          customers[i] = customer;
        }
      });
      localStorage.setItem(this.dbCustomers, JSON.stringify(customers));
    }
  }

  getCustomer(id: number): Customer {
    let customers = JSON.parse(localStorage.getItem(this.dbCustomers))
    return customers.filter(data => data.id === id)[0];
  }

  addCustomer(customer: Customer) {
    let customers = JSON.parse(localStorage.getItem(this.dbCustomers));
    if (customers) {
      customer.id = this.getNewKey();
      customers.push(customer);
    } else {
      customer.id = 1;
      customers.push(customer);
    }
    localStorage.setItem(this.dbCustomers, JSON.stringify(customers));
  }

  addOrder(order: Order) {
    let values=[];
    console.log(order);
    
    let orders = JSON.parse(localStorage.getItem(this.dbOrders));
    if (orders) {
      orders.push(order);
    } else {
      values.push(order);
      orders = values;
    }
    localStorage.setItem(this.dbOrders, JSON.stringify(orders));

    let customers = JSON.parse(localStorage.getItem(this.dbCustomers));
    if (customers) {
      customers.map((cust, i) => {
        if (cust.id == order.customerid) {
          customers[i].orders.push(order.id);
          console.log(customers[i].orders);
          
        }
      });
      localStorage.setItem(this.dbCustomers, JSON.stringify(customers));
    }
  }

  saveOrder(order: Order) {
    let values: Order[] = []
    let orders = JSON.parse(localStorage.getItem(this.dbOrders));
    if (orders) {
      values = orders.filter(ord => ord.id !== order.id);
      values.push(order);
    }
    localStorage.setItem(this.dbOrders, JSON.stringify(values));
  }

  delOrder(order: Order) {
    let values: Order[] = []
    let orders = JSON.parse(localStorage.getItem(this.dbOrders));
    if (orders) {
      values = orders.filter(ord => ord.id !== order.id);
    }
    localStorage.setItem(this.dbOrders, JSON.stringify(values)); 
    
    let customers = <Customer[]>JSON.parse(localStorage.getItem(this.dbCustomers));
    if (customers) {
      customers.map((cust, i) => {
        if (cust.id == order.customerid) {
          // customers[i].orders.push(order.id);
          // console.log(customers[i].orders);
          customers[i].orders = customers[i].orders.filter(ord => ord !== order.id);
        }
      });
      localStorage.setItem(this.dbCustomers, JSON.stringify(customers));
    }
  }

  getAllOrders() {
    return JSON.parse(localStorage.getItem(this.dbOrders));
  }

  getCustomerOrders(ordersids: String[]): Order[] {
    let values:Order[] = []
    let orders = JSON.parse(localStorage.getItem(this.dbOrders));
    if (orders) 
    {
      ordersids.forEach(ids => {
        // console.log(orders.filter(ord => ord.id == ids)[0]);
        
        values.push(orders.filter(ord => ord.id == ids)[0]);
      })
    }
    return values;
  }



  removeItem(key: string) {
    localStorage.removeItem(this.lsName + key);
  }

  getItem(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(this.lsName + key));
    } catch (err) {
      return null;
    }
  }

  setItem(key: string, data: any): boolean {
    try {
      localStorage.setItem(this.lsName + key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  addItem(data: any): boolean {
    const id = this.getNewKey();
    // console.log('new key = ' + id);
    data.id = id;
    try {
      localStorage.setItem(this.lsName + id, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  

  getAllItems(): Array<any> {
    const values = [];
    const keys = Object.keys(localStorage);
    let i: number = keys.length;

    while (i--) {

      if (keys[i].substring(0, this.lsName.length) === this.lsName) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
      }
    }
    return values;
  }

  
  getNewKey(): number {
    let customers = JSON.parse(localStorage.getItem(this.dbCustomers));
    console.log(customers);
    if (customers) {
      let max = 0;
      for (let i = 0, len=customers.length; i < len; i++) {
        console.log(customers[i]);
        
        let v = customers[i].id;
        max = (v > max) ? v : max;
      }
      return max + 1;
    } else {
      return 1;
    }
  }
}
