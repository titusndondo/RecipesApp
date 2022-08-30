import { Component, OnInit } from '@angular/core';
import { CartItemsService } from '../services/cart-items.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  cartItems;

  constructor(private cartItemsService: CartItemsService) { }

  ngOnInit(): void {
    this.cartItems = this.cartItemsService.cartItems;
  }
}
