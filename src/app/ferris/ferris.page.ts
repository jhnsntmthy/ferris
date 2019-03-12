import { Component, OnInit } from '@angular/core';
import { ferris } from './animate';

@Component({
  selector: 'app-ferris',
  templateUrl: 'ferris.page.html',
  styleUrls: ['ferris.page.scss']
})

export class FerrisPage implements OnInit {

  public items: Array<{ title: string; }> = [];

  constructor() {
    this.items = [
      { title: 'Jerry' },
      { title: 'Yaron' },
      { title: 'David' },
      { title: 'Bruce' },
      { title: 'Dustin' },
      { title: 'Timothy' },
      { title: 'Daniel' },
      { title: 'Molly' },
      { title: 'Luis' },
      { title: 'Rodrigo' },
      { title: 'Joe' },
      { title: 'Brad' },
      { title: 'Virginia' },
      { title: 'Steve' },
      { title: 'Jeremy' },
      { title: 'Betsy' },
      { title: 'Maura' },
    ];
  }

  ngOnInit() {
    console.log('FerrisPage', this);
    ferris('.wheel');
  }
}
