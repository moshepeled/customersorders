export class Item {
  name: string;
  count: number;
}

export class Order {
         id: string;
         customerid: number;
         item: Array<Item> = [];

         constructor(order: Order) {
            Object.assign(this, order);
         }

         additem(item: Item) {
           this.item.push(item);
         }
       }
