import { Component, OnInit, OnChanges, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Customer } from '../../shared/customer';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  _customer: Customer;

  @Input()
  set customer(customer: Customer) {
    this._customer = customer;
    this.newcustomer = customer;
  }

  customers: Array<Customer>;
  showUserForm = true;
  showFillMesssage = false;
  lastID = 0;
  @ViewChild('userForm')
  form: any;

  newcustomer: Customer;
  constructor(private customerService: CustomerService) {
    
  }

  ngOnInit() {
    this.clearCustomer();
  }

  clearCustomer() {
    this.newcustomer = new Customer();
  }
  
  addCutomer(custForm) {

    if (!custForm.form.valid) {
      this.showFillMesssage = true;
    } else {
      this.newcustomer.orders = [];
      this.customerService.sendCustomer(new Customer(this.newcustomer));
      custForm.form.reset();
      this.showFillMesssage = false;
    }
  }

  saveCutomer(custForm) {
    if (!custForm.form.valid) {
      this.showFillMesssage = true;
    } else {
      this.customerService.sendCustomer(new Customer(this.newcustomer));

      custForm.form.reset();
      this.showFillMesssage = false;
      this.clearCustomer();
      
    }
  }

  deleteCutomer(custForm) {
    if (confirm('Are you sure to delete ?')) {
      // this.localstorage.removeItem(this.customerid);
      custForm.form.reset();
      this.showFillMesssage = false;
      
      this._customer = new Customer();
      this._customer.id = this.newcustomer.id;
      this._customer.orders = this.newcustomer.orders;
      this.customerService.deleteCustomer(this._customer);
      this.clearCustomer();
    }
  }

}
