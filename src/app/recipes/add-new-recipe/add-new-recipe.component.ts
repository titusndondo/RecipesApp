import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { RecipeItemsService } from 'src/app/services/recipe-items.service';

@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})
export class AddNewRecipeComponent implements OnChanges, OnInit, OnDestroy {

  Editor = ClassicEditor;

  imageUploadActive = false;
  imageName: string;

  selectedFile;
  ingredientItems;
  ingredientTypes;

  recipeForm: FormGroup;

  populateFormSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeItemsService: RecipeItemsService
  ) { };

  ngOnChanges() {
    
  }

  ngOnInit(): void {

    this.recipeForm = new FormGroup({
      'title': new FormControl(null),
      'details': new FormControl(null),
      'image': new FormControl(null),
      'ingr_name': new FormControl(null),
      'ingr_quantity': new FormControl(null)
    });

    this.populateFormSubscription = this.route.params.subscribe(params => {
      const data = {recipeName: params['name'], recipeId: params['id']};
      this.recipeItemsService.getRecipeDetails(data)
        .subscribe(
          (data: Recipe) => {

            this.imageName = data.imageURL.split('/').slice(-1).pop();
            this.recipeForm.patchValue({
              title: data.name,
              details: data.steps.join(' '),
              image: this.imageName
            });

            this.ingredientItems = data.ingredients;

          }, error => {

          }
        );
    });

  };

  onChooseFile(e) {
    this.imageUploadActive = true;
    // console.log(e)

  }

  onChange(e) {
    // console.log(e);
  }

  onChangeImage(e) {
    const file = e.target.files[0];
    this.imageName = file.name;

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {

      this.selectedFile = {src: event.target.result, file: file};
      // console.log(this.selectedFile);

    this.recipeItemsService.uploadImage(this.selectedFile.file)
      .subscribe(response => {
        // console.log(response);
      });
    })

    reader.readAsDataURL(file);
  }

  onSubmit(e) {
    this.recipeForm.patchValue({
      'details': this.recipeForm.value.details,
      'image': this.imageName
    })
    this.recipeItemsService.updateRecipe(this.recipeForm.value);
  }



  ngOnDestroy() {
    this.populateFormSubscription.unsubscribe();
  }

}
