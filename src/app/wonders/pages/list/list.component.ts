import { Component, OnInit } from '@angular/core';
import { WondersService } from '../../services/wonders.service';
import { Wonder } from '../../interfaces/wonders.interface';
import { ActivatedRoute } from '@angular/router';
import { FADEINOUT } from '../../services/fade-in-fade-out.animation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  animations: [FADEINOUT],
  styles: []
})
export class ListComponent implements OnInit {

  wonders: Wonder[] = [];

  constructor(private wondersService: WondersService) { 
  }

  ngOnInit(): void {
     this.loadWonders();
  }
  logAnimation(_event: any) {
    console.log(_event);
  }
  loadWonders(){
    this.wonders  = [];
    this.wondersService.getWonders()
    .subscribe((data: any) => { this.wonders = data.data.wonders.items; console.log("data loaded"); console.log(data.data.wonders.items.length); });
  }
}
