import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { TimerPage } from './timer.page';

describe('TimerPage', () => {
  let component: TimerPage;
  let fixture: ComponentFixture<TimerPage>;
  let timerPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(TimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 26 elements', () => {
    timerPage = fixture.nativeElement;
    const items = timerPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(26);
  });

});
