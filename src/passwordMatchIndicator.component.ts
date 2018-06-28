import {Component, OnChanges, Input, SimpleChange} from '@angular/core';

@Component({
  selector: 'rb-password-match-indicator',
  styles: [`
    .strengthBar {
      display: inline;
      list-style: none;
      margin: 0 0 0 15px;
      padding: 0;
      vertical-align: 2px;
    }

    .strengthBar .point {
      background: #DDD;
      border-radius: 2px;
      display: inline-block;
      height: 5px;
      margin-right: 1px;
      width: 20px;
    }

    .strengthBar .point:last-child {
      margin: 0;
    }
    .pre {
      white-space: pre;
    }
  `],
  template: `
    <div id="pw_match" #strength>
      <small>{{barLabel}}</small>
      <ul id="strengthBar" class="strengthBar">
        <li id="bar0" class="point" [style.background-color]="bar0"></li>
      </ul>
      <small [hidden]="!matches" class="pre">  {{matchLabel}}</small>
    </div>
  `
})
export class PasswordMatchIndicatorComponent implements OnChanges {
  @Input() passwordToCheck: string;
  @Input() confirmPasswordToCheck: string;
  @Input() barLabel: string;
  @Input() barColors: Array<string>;
  @Input() baseColor: string;
  @Input() matchLabels: Array<string>;

  bar0: string;

  matchLabel: string;

  private colors: Array<string>;
  matches: Array<string>;
  private defaultColors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
  private defaultBaseColor: string = '#DDD';

  constructor() {
    this.colors = this.defaultColors;
  }

  private checkBarColors(): void {
    // Accept custom colors if input is valid, otherwise the default colors will be used
    if (this.barColors && this.barColors.length === 3) {
      this.colors = this.barColors.slice();
    } else {
      this.colors = this.defaultColors;
    }

    this.matches = this.matchLabels && this.matchLabels.length === 3 ? this.matchLabels.slice() : null;
    this.setMatchLabel(0);

    if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.baseColor)) {
      this.baseColor = this.defaultBaseColor;
    }
  }


  private getColor(s: number) {
    let idx = 0;
    if (s == 0) {
      idx = 0;
    }
    else if (s < 0) {
      idx = 1;
    }
    else {
      idx = 2;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }

  private static checkMatch(p: string,cp: string) {
    console.log(p);
    console.log(cp);
    console.log(p==cp);
    if(!p || p==""){
      return 0;
    }
    else if(p==cp){
      return 1;
    }
    else{
      return -1;
    }
  }

  getStrengthIndexAndColor(password: string,confirmPassword: string) {
    return this.getColor(PasswordMatchIndicatorComponent.checkMatch(password,confirmPassword));
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.checkBarColors();
    this.setBarColors(this.baseColor);
    if (this.passwordToCheck && this.confirmPasswordToCheck) {
      const c = this.getStrengthIndexAndColor(this.passwordToCheck,this.confirmPasswordToCheck);
      this.setMatchLabel(c.idx - 1);
      this.setBarColors(c.col);
    }
  }

  private setBarColors(col: string) {
    this['bar0'] = col;    
  }
  private setMatchLabel(index: number) {
    if (this.matches) {
      this.matchLabel = this.matches[index];
    }
  }
}
