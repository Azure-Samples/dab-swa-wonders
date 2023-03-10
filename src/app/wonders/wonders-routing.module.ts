import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { WonderComponent } from './pages/wonder/wonder.component';
import { HomeComponent } from './pages/home/home.component';

const routes:Routes=[

  {
      path: '',
      component: HomeComponent,
      children: [
      { 
          path: 'list',
          component: ListComponent
      },
      { 
        path: 'add',
        component: AddComponent
      },
      { 
        path: 'edit/:id',
        component: AddComponent
      },
      { 
        path: 'search',
        component: SearchComponent
      },
      { 
        path: ':id',
        component: WonderComponent
      },
      { 
        path: '**',
        redirectTo : 'list'
      },
    ]
  },


];

@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WondersRoutingModule { }
