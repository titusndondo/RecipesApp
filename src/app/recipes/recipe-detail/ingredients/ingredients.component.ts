import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  @Input() ingredient;

  constructor(private cartItemsService: CartItemsService) { }

  ngOnInit(): void {
  }

  onAddToCart(e, itemElement, amountElement) {
    e.preventDefault();
    this.cartItemsService.cartItems.push({
      name: itemElement.textContent, 
      amount: +amountElement.textContent.replace('(', '').replace(')', '')
    });
  }

}
