import { Customer } from '../../shared/customer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../models/local-storage.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customer: Customer;
  customers: Array<Customer>;
  showUserForm = false;
  lastID = 0;
  selectedID = 0;
  @ViewChild('userForm')
  form: any;

  newcustomer: Customer = new Customer();

  constructor(private localstorage: LocalStorageService) {}

  ngOnInit() {
    this.customers = this.localstorage.getAllItems();
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

  callBack(data: string) {
    this.customers = this.localstorage.getAllItems();
  }
}
