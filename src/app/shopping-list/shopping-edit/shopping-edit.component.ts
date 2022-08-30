import { Component, OnInit, ViewChild } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  addItem = false;
  @ViewChild('addedItemName') addedItemName;
  @ViewChild('addedItemAmount') addedItemAmount;

  constructor(private cartItemsService: CartItemsService) { }

  ngOnInit(): void {
  }

  onAddItem(e) {
    e.preventDefault();
    this.addItem = !this.addItem;
    if(this.addedItemName.nativeElement.value && this.addedItemAmount.nativeElement.value) {
      
      this.addedItemName = this.addedItemName.nativeElement.value;
      this.addedItemAmount = +this.addedItemAmount.nativeElement.value;
      this.cartItemsService.cartItems.push({
        name: this.addedItemName,
        amount: this.addedItemAmount
      })
    }  
  }
}
