import { Customer } from '../../shared/customer';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../../models/local-storage.service';
import { CustomerService } from '../../services/customer.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {
  customer: Customer;
  customers: Array<Customer>;
  showUserForm = false;
  lastID = 0;
  @ViewChild('userForm')
  form: any;

  newcustomer: Customer = new Customer();

  subscription: Subscription;

  constructor(private ls: LocalStorageService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customers = this.ls.getCustomers();

    this.customerService.getCustomer().subscribe(
      customer => {
        if (customer.id !== 0 && customer.firstName === '') {
          this.ls.delCustomer(customer);
          this.customers = this.customers.filter(cust => cust.id != customer.id);
          return;
        }

        if (customer.id !== 0) {
          this.ls.saveCustomer(customer);
          this.customers.map((cust, i) => {
            if (cust.id == customer.id) {
              console.log(cust);
              console.log(customer);
              this.customers[i] = customer;
            }
          });
        }

        if (customer.id === 0) {
          this.ls.addCustomer(customer);
          this.customers.unshift(customer);
        }
      }
    )

  }

  ngOnDestroy() {
    try {
      this.subscription.unsubscribe();
    } catch {

    }
  }

  onSelect(cust: Customer) {
    this.customer = cust;
  }

}
