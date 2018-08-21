import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';

import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';

import { routingModule } from './app.routing';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    CustomersComponent,
    NavbarComponent,
    CustomerComponent,
    OrderComponent,
    OrderlistComponent,
    HomeComponent
  ],
  imports: [BrowserModule, FormsModule, routingModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [OrdersComponent]
})
export class AppModule {}
