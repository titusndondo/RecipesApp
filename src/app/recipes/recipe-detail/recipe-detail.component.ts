import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeFormService } from 'src/app/services/recipe-form.service';
import { RecipeItemsService } from 'src/app/services/recipe-items.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  showDropDown: Boolean = false;

  selectedRecipeData;

  constructor(
    private recipeItemsService: RecipeItemsService,
    private recipeFormService: RecipeFormService,
    private router: Router,
    private route: ActivatedRoute
    ) { };

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      console.log(params);
 
      this.recipeItemsService.getRecipeDetails({
        recipeName: params['name'], 
        recipeId: +params['id']
      }).subscribe(data => {
        console.log(data);
        this.selectedRecipeData = data;
      });

    });

  };

  onEdit() {

    this.router.navigate(['/recipes', this.selectedRecipeData.name, this.selectedRecipeData.recipe_id, 'edit']);

    

  }

  onChangePicture() {
    
  }

}
