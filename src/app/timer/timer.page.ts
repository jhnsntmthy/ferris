import { Component, OnInit } from '@angular/core';
import '@authentic/mwc-circular-progress';
import '@authentic/mwc-button';
import '@authentic/mwc-chips';
import '@authentic/mwc-slider';

@Component({
  selector: 'app-timer',
  templateUrl: 'timer.page.html',
  styleUrls: ['timer.page.scss']
})
export class TimerPage implements OnInit {
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  public dial_progress: number = 0;
  public lapElapsed: number = 0;
  public totalElapsed: number = 0;
  public totalStr: string = '0s';
  private totalTimer: number;
  private lapTimer: number;
  private smoothness: number = 100;
  private speedFactor: number = 1; // increase this to speed up the clock
  private lapTime: number = 90000; // 1.5 minutes

  constructor() {
    this.dial_progress = 100;
  }

  startTimer() {
    this.resetAll();
    this.totalTimer = setInterval(this.tick.bind(this), this.smoothness);
  }

  resetAll() {
    clearInterval(this.totalTimer);
    this.totalElapsed = 0;
    this.lapElapsed = 0;
  }

  elapse() {
    return this.smoothness * this.speedFactor;
  }

  tick() {
    this.totalElapsed += this.elapse();
    this.checkForLap();
    this.translateTotal(this.totalElapsed);
  }

  checkForLap() {
    this.lapElapsed += this.elapse();
    this.lapElapsed = this.lapElapsed > this.lapTime ? 0 : this.lapElapsed
    this.dial_progress = 100 * this.lapElapsed / this.lapTime;
  }

  translateTotal(s: number) {
    const ms = this.totalElapsed % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mm = s;
    this.totalStr = mm + 'm ' + secs + 's';
  }

  ngOnInit() {
  }
}
