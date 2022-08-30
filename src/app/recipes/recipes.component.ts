import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralPurposeService } from '../services/generalpurpose.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  showDropDown = false;

  constructor(
    private router: Router,
    private generalPurposeService: GeneralPurposeService
  ) { };

  ngOnInit(): void {
    this.generalPurposeService.isDropDownShown.subscribe(
      (value: boolean) => {
        this.showDropDown = value;
      }
    )
  };

  onAddNewRecipe() {
    this.router.navigate(['/recipes', 'add-new'])
  }

  onNavigate(e, page) {

    this.router.navigate([`${page}`]);
    this.showDropDown = !this.showDropDown;
  }

  onLogout(e) {
    e.preventDefault();
    this.generalPurposeService.isUserAuthenticated.next(false);
    this.showDropDown = !this.showDropDown;
    this.router.navigate(['/'])
  }

}
