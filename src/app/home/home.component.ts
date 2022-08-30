import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthResponseData, AuthService } from '../services/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  openSignUp = false;
  username: string;
  userLoggedSub;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void { };

  onSignUp() {
    this.openSignUp = true;
    this.userLoggedSub = this.authService.user.subscribe(
      (response: AuthResponseData) => {
        console.log(response)
        this.username = response.username
        this.openSignUp = false;

      }
    )
  }

  ngOnDestroy() {
    this.userLoggedSub.unsubscribe()
  }

}
