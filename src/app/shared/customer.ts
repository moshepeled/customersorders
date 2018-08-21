import { Order } from './order';

export class Customer {
  firstName: string;
  lastName: string;
  id: number;
  cellular: string;
  orders: Array<Order> = [];
  hide?: boolean;
  isActive?: boolean;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.id = 0;
    this.cellular = '';
    this.orders = [];
  }

}
