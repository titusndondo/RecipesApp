import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth-service';
import { GeneralPurposeService } from '../services/generalpurpose.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isSignupMode = true;
  isLoading = false;
  error: string = null;
  signupSubscription: Subscription;
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private generalPurposeService: GeneralPurposeService,
    private router: Router
  ) { };

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null)
    })

  }

  onChangeForm(e) {
    e.preventDefault();
    this.isSignupMode = !this.isSignupMode;
  }

  onSubmit() {
    console.log(this.signupForm.value)
    if(!this.signupForm.valid) {
      return;
    }
    this.isLoading = true;

    let authObs: Observable<any>;

    if(this.isSignupMode) {
      // Signup
      authObs = this.authService.createUser(this.signupForm.value)
      
    } else {
      // login
      authObs = this.authService.login(this.signupForm.value)
    }

    this.signupSubscription = authObs
      .subscribe(
        response => {
          console.log(response, new Date(response.expiresIn))
          this.isLoading = false;
          this.isSignupMode = false;

          if(!this.isSignupMode)
            setTimeout(() => {
              this.router.navigate(['/recipes'])
            }, 100)
        },
        error => {
          this.error = error.error.message;
          this.isLoading = false;
        }
      )
  }

  onCloseAlert(e) {
    e.preventDefault();
    this.error = null;
  }

  ngOnDestroy() {
    this.signupSubscription.unsubscribe();
  }
}
