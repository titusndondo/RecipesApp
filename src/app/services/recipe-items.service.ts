// https://github.com/raywenderlich/recipes/blob/master/Recipes.json
// https://api2.bigoven.com/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({providedIn: 'root'})
export class RecipeItemsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { };

  baseURL = 'http://127.0.0.1:5000/'

  getRecipeDetails(recipeData) {

    const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': this.authService.current_user['token'] 
    })

    return this.http.get(
      `${this.baseURL}recipes/${recipeData.recipeId}`,
      { headers: headers }
    );
  }

  fetchRecipes() {

     const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': this.authService.current_user['token'] 
      })

      
    return this.http.get(
      `${this.baseURL}recipes`,
      { headers: headers }
    );
  };

  uploadImage(image) {
    let formData = new FormData();
    console.log(image);

    formData.append('example', 'output');

    console.log(formData);

    return this.http.post(
      `${this.baseURL}recipes/1/update`,
      {'image': image}
    )
  }

  updateRecipe(newData) {
    
    newData.details = newData.details.replace('<p>', '').replace('</p>', '').split('.');
    console.log(newData);
    this.http.post(
      `${this.baseURL}/recipes/${newData.id}/update`,
      newData
    )
  }

  showDetails = new EventEmitter();
  changePicture = new Subject();

  selectedRecipeData;


}