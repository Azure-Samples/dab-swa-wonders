import { Component, Input} from '@angular/core';
import { Wonder } from '../../interfaces/wonders.interface';

@Component({
  selector: 'app-wonder-card',
  templateUrl: './wonder-card.component.html',
  styles: [`
    mat-card{
      margin-top: 20px;
      min-height: 70vh;
    }

    .mat-card-image{
      max-height: 60vh;
      max-width: 20vw;
    }
    .red-text {
      font-size: 20px;
      color: #fa7aa5 !important;

    }

    .blue-text {
      font-size: 20px;
      color: #09b0ec !important;

    }
`]
})
export class WonderCardComponent {

  @Input() wonder!:Wonder; 
  highlightStart = 30;
  constructor() { }


}
