import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ferris',
  templateUrl: 'ferris.page.html',
  styleUrls: ['ferris.page.scss']
})
export class FerrisPage implements OnInit {

  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor() {
  }

  ngOnInit() {
  }
}
