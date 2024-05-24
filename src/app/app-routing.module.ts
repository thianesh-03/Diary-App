import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { DiaryFormComponent } from './diary-form/diary-form.component';

const routes: Routes = [
  {
    path:"",
    component:DiaryComponent
  },
  {
    path:"data-entry",
    component:DiaryFormComponent
  },
  {
    path:"edit/:id",
    component:DiaryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
