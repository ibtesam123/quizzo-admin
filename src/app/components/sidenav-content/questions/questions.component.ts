import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  pageIndex: number

  catID: number = -1

  changePageIndex(i: number) {
    this.pageIndex = i
  }

  setCategoryIDForQuestionList(i: number) {
    this.catID = i
    this.pageIndex = 3
  }

}
