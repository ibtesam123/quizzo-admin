import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
  ) { }

  @Input()
  pageIndex: number

  ngOnInit(): void {
  }

  changePageIndex(i: number) {
    this.pageIndex = i
  }

}
