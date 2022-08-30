import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { GeneralPurposeService } from '../services/generalpurpose.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  isAuthenticated = false;
  showDropDown = false;

  @Output() viewSelected = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    private generalPurposeService: GeneralPurposeService
    ) { };

  ngOnInit() {
    
    this.userSub = this.authService.user
      .subscribe(
        user => {
          console.log(`Here is the current user ${user}`)
          this.isAuthenticated = !!user;
        }
      )

    this.generalPurposeService.isUserAuthenticated.subscribe(
      (value: boolean) => this.isAuthenticated = value
    )
  };

  onNavigate(e, page) {
    e.preventDefault();

    this.router.navigate([`/${page}`])
  }

  onShowDropDown(e) {
    e.preventDefault();
    this.generalPurposeService.isDropDownShown.next(!this.showDropDown);
    
  }



  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}