import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { TimerPage } from './timer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TimerPage
      }
    ])
  ],
  declarations: [TimerPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TimerPageModule {}
