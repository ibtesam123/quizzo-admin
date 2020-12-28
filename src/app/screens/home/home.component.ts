import { Component, OnInit } from '@angular/core';
import { IS_PHONE } from 'src/app/constants/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }

  collapse: boolean
  collapseClasses: {}
  selectedIndex: number = 2

  ngOnInit(): void {
    this.collapse = IS_PHONE
    this.collapseClasses = {
      'pt-14': true,
      'pl-52': !this.collapse
    }
  }

  toggleCollapse() {
    this.collapse = !this.collapse
    this.collapseClasses = {
      'pt-14': true,
      'pl-52': !IS_PHONE && !this.collapse
    }
  }

  selectContent(i: number) {
    this.selectedIndex = i
    if (IS_PHONE)
      this.toggleCollapse()
  }

}
