import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit {

  constructor() { }

  @Output()
  toggleEmitter = new EventEmitter()

  ngOnInit(): void {
  }

  toggleCollapse() {
    this.toggleEmitter.emit('')
  }

  logout() {
    console.log("logging user out")
  }

}
