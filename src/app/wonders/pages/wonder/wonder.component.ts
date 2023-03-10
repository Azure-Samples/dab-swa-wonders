import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap} from 'rxjs/operators';

import { Wonder } from '../../interfaces/wonders.interface';
import { WondersService } from '../../services/wonders.service';


@Component({
  selector: 'app-wonder',
  templateUrl: './wonder.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class WonderComponent implements OnInit {

  wonder!:Wonder; 

  constructor(
    private activatedRoute:ActivatedRoute,
    private wondersService: WondersService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id})=> this.wondersService.getWonderById(id))
      )
      .subscribe((data: any) => { this.wonder = data.data.wonder_by_pk; console.log(this.wonder) });
  }

  comeBack(){
    this.router.navigate(['wonders/list'])
  }

}

