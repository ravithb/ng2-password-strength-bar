import { NgModule } from '@angular/core';
import { PasswordStrengthBarComponent } from './passwordStrengthBar.component';
import { PasswordMatchIndicatorComponent } from './passwordMatchIndicator.component';

@NgModule({
    imports: [ ],
    declarations: [ PasswordStrengthBarComponent,PasswordMatchIndicatorComponent ],
    exports: [ PasswordStrengthBarComponent,PasswordMatchIndicatorComponent ],
})
export class PasswordStrengthBarModule {}
