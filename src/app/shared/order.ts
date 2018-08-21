export class Item {
  name: string;
  // itemId: string;
  count: number;
}

export class Order {
         id: string;
         customerid: number;
         item: Array<Item> = [];

         constructor(id, customerid) {
           this.id = id;
           this.customerid = customerid;
         }

         additem(item: Item) {
           this.item.push(item);
         }
       }
