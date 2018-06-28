import {Component, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PasswordStrengthBarModule} from '../index';

@Component({
  selector: 'my-app',
  template: `
    <h3>Angular 2 Password Strength Bar</h3>
    <div>
      <form name="myForm" novalidate>
        <input type="password" class="form-control" id="password" name="password" placeholder="Enter password"
               [(ngModel)]="account.password" #password="ngModel"
               minlength="5" maxlength="50" required>
        <rb-password-strength-bar [passwordToCheck]="account.password" [barColors]="myColors"
                                   [barLabel]="barLabel"
                                   [baseColor]="baseColor"
                                   [strengthLabels]="strengthLabels">
        </rb-password-strength-bar>
        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password"
               [(ngModel)]="account.confirmPassword" #confirmPassword="ngModel"
               minlength="5" maxlength="50" required>
        <rb-password-match-indicator [passwordToCheck]="account.password" 
        [confirmPasswordToCheck]="account.confirmPassword"
        [barColors]="matchColors" [barLabel]="mBarLabel"
                                   [baseColor]="baseColor"
                                   [matchLabels]="matchLabels"
        ></rb-password-match-indicator>
      </form>
    </div>
  `,
})
export class AppComponent {
  public account = {
    password: <string>null,
    confirmPassword: <string>null
  };
  public baseColor = '#FFF';
  public barLabel = 'Password strength:';
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  public mBarLabel = 'Passwords match:';
  public matchLabels = ['', 'Not Matching', 'Matching'];
  public matchColors = [ '#FF6D00','#DD2C00','#00C853'];
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PasswordStrengthBarModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
