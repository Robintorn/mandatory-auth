import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Tar del av AuthService klassen.
  constructor(private authService: AuthService) {
    this.user = this.authService._user;
    this.token = this.authService._token;
  }

  user;
  token;
  error;

  // För att kunna kunna få en sammankoppling mellan
  // Klasserna så ser jag till att this.user exempelvis
  // Kommer att vara samma som this.authSerice._user.

  /*
    Den skrivs alltså i formen i app-componenten. 
    Men för att kunna få in värderna i inputsen
    så skriver jag på detta sätt. Gäller inte bara
    det men tog ett exempel.
  */
  login(credentials) {
   this.authService.login(credentials);
   this.user = this.authService._user;
   this.token = this.authService._token;
   this.error = this.authService._error;
  }

  logout() {
    this.authService.logout();
    this.user = this.authService._user;
    this.token = this.authService._token;
  }

  /* 
    En funktion som tar in en del av en path
    som parameter. Det blir alltså generiskt.
    Så att jag kan välja att hämta data ifrån
    en annan route om det nu fanns.

    exempel: this.authService.getResource('food');
  */
  testApi() {
    this.authService.getResource('friends');
  }
}
