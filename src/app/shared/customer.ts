export class Customer {
  firstName: string;
  lastName: string;
  id: number;
  cellular: string;
  orders: Array<String> = [];

  constructor(customer?: Customer) {
    if (customer) {
      Object.assign(this, customer);
    } else {
      this.firstName = '';
      this.lastName = '';
      this.id = 0;
      this.cellular = '';
      this.orders = [];
    }

  }

}


