import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { FerrisPage } from './ferris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FerrisPage
      }
    ])
  ],
  declarations: [FerrisPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FerrisPageModule {}
