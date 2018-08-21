import { Component, OnInit, OnChanges, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Customer } from '../../shared/customer';
import { LocalStorageService } from '../../models/local-storage.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input()
  customerid: string;

  @Output()
  parback: EventEmitter<string> = new EventEmitter<string>();

  customers: Array<Customer>;
  showUserForm = true;
  showFillMesssage = false;
  lastID = 0;
  @ViewChild('userForm')
  form: any;

  newcustomer: Customer;
  constructor(private localstorage: LocalStorageService) {
    this.customerid = '0';
  }

  ngOnInit() {
    this.clearCustomer();
  }

  ngOnChanges() {
    if (this.customerid !== '0') {
      this.newcustomer = this.localstorage.getItem(this.customerid);
    } else {
      this.clearCustomer();
    }
  }

  clearCustomer() {
    this.newcustomer = new Customer();
  }
  onSubmit({ value, valid }: { value: Customer; valid: boolean }) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      this.lastID += 1;
      value.isActive = true;
      value.hide = true;
      value.id = this.lastID;
      this.customers.unshift(value);
      this.localstorage.setItem(value.id.toString(), value);
      this.form.reset();
    }
  }

  addCutomer(custForm) {
    if (!custForm.form.valid) {
      this.showFillMesssage = true;
    } else {
      this.newcustomer.orders = [];
      console.log(this.newcustomer);
      this.localstorage.addItem(this.newcustomer);
      custForm.form.reset();
      this.showFillMesssage = false;
      this.clearCustomer();
      this.callBack('add');
    }
  }

  saveCutomer(custForm) {
    if (!custForm.form.valid) {
      this.showFillMesssage = true;
    } else {
      console.log(this.newcustomer);
      this.localstorage.setItem(
        this.newcustomer.id.toString(),
        this.newcustomer
      );
      custForm.form.reset();
      this.showFillMesssage = false;
      this.clearCustomer();
      this.callBack('update');
    }
  }

  getCutomer(custForm) {
    this.newcustomer = this.localstorage.getItem(this.customerid);
  }

  deleteCutomer(custForm) {
    if (confirm('Are you sure to delete ?')) {
      this.localstorage.removeItem(this.customerid);
      custForm.form.reset();
      this.showFillMesssage = false;
      this.clearCustomer();
      this.callBack('delete');
    }
  }

  callBack(data: string) {
    this.parback.emit(data);
  }
}
