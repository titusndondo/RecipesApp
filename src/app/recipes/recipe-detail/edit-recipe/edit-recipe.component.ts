import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { RecipeFormService } from 'src/app/services/recipe-form.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, AfterContentInit {

  selectedRecipeData: Recipe;

  constructor(private recipeFormService: RecipeFormService) { }

  ngOnInit(): void {
    this.recipeFormService.populateForm
      .subscribe((data: Recipe) => {
        this.selectedRecipeData = data;
      });
  }

  ngAfterContentInit() {
    

    console.log(this.selectedRecipeData);
  }

}
