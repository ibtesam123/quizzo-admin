import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnChanges(_): void {
    this.collapseClasses = {
      '-left-52': this.collapse
    }
  }

  @Input()
  collapse: boolean
  collapseClasses = {}
  navContent: String[] = [
    "Dashboard",
    "Category",
    "Questions",
    "Games",
    "Users"
  ]

  @Output()
  selectedEmitter = new EventEmitter()

  ngOnInit(): void {
    this.collapseClasses = {
      '-left-52': this.collapse
    }
  }

  selectContent(index: number) {
    this.selectedEmitter.emit(index)
  }

}
