import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  @Input() item;

  constructor() { };

  ngOnInit(): void { };

  iconSelected = false;

  onSelectCartItem(e) {
    e.preventDefault();
    this.iconSelected = !this.iconSelected;
  }

}
