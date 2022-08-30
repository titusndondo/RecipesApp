import { Component, OnInit } from '@angular/core';
import { RecipeItemsService } from 'src/app/services/recipe-items.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes;

  constructor(
    private recipeItemsService: RecipeItemsService
    ) { };

  ngOnInit(): void {
    this.recipes = this.recipeItemsService.fetchRecipes()
      .subscribe(data => {
        console.log(data);
        this.recipes = data;
      });
  }

  onShowDetails(e) {
    e.preventDefault();
  }

  

  
}
