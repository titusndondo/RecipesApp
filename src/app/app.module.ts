import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { IngredientsComponent } from './recipes/recipe-detail/ingredients/ingredients.component';
import { ShoppingItemComponent } from './shopping-list/shopping-item/shopping-item.component';
import { CartItemsService } from './services/cart-items.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNewRecipeComponent } from './recipes/add-new-recipe/add-new-recipe.component';
import { EditRecipeComponent } from './recipes/recipe-detail/edit-recipe/edit-recipe.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';


const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: ':name/:id', component: RecipeDetailComponent },
  { path: ':name/:id/edit', component: AddNewRecipeComponent },
    { path: 'add-new', component: AddNewRecipeComponent }
  ]},
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    IngredientsComponent,
    ShoppingItemComponent,
    HomeComponent,
    AddNewRecipeComponent,
    EditRecipeComponent,
    FooterComponent,
    SignupComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [CartItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
