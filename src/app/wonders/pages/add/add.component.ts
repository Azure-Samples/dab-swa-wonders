import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';

import { Wonder, Type } from '../../interfaces/wonders.interface';
import { WondersService } from '../../services/wonders.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    mat-icon{margin-right: 5px; margin-bottom: 5px;}
    img{width: 100%; border-radius: 5px;}
  `]
})
export class AddComponent implements OnInit {

  types=[
    {
      id: 'Medieval',
      desc: 'Medieval'
    },
    {
      id: 'Civil',
      desc: 'Civil'
    },
    {
      id: 'Ancient',
      desc: 'Ancient'
    }
  ]

  wonder:Wonder={
    name: " ",
    type: Type.Medieval,
    latitude: " ",
    longitude: " ",
    country: " ",
    location: " ",
    wikipedia_link:" ",
    picture_link:" ",
    build_in_year:""
  };


  constructor(
    private wondersService:WondersService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private snackBar:MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('edit')){
      return ;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.wondersService.getWonderById(id))
      )
      .subscribe((data: any) => { 
        console.log("###frozen",Object.isFrozen(this.wonder)); 
        this.wonder = data.data.wonders_by_pk as Wonder; console.log(this.wonder) 
      });
  }

  save(){
     
    if (this.wonder.name.trim().length===0){
      return ;
    }
   
    if (this.wonder.id) {
        this.wondersService.updateWonder(this.wonder)
        .subscribe( resp =>{
          this.wonder=resp.data.updatewonders;
          this.showSnackbar("The wonder was updated");
        });

    } else {
      this.wonder.id = Math.random().toString();
      this.wondersService.addWonder(this.wonder)
      .subscribe(({data}:any)=>{
        this.router.navigate(['/wonders/list']);
        this.showSnackbar("The wonder was created");
      });
    }

  }

  onNameChange(newValue: string) {
    console.log('New name:', newValue);
  }

  delete(){
   const dialog=this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.wonder
    });

    dialog.afterClosed().subscribe(resp=>{
      if(resp){
        if(this.wonder.id){
          this.wondersService.deleteWonder(this.wonder)
          .subscribe(resp=>{
            this.router.navigate(['/wonders/list']);
            this.showSnackbar("The wonder was deleted")
          })
        }
      }
    })
  }

  showSnackbar(message:string):void{
    this.snackBar.open(message, 'Close', {
      duration: 2500
    })
  }

}
