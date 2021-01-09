import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-dashboard',
  templateUrl: './question-dashboard.component.html',
  styleUrls: ['./question-dashboard.component.css']
})
export class QuestionDashboardComponent implements OnInit {

  constructor() { }

  searchText: string = ""

  @Output()
  addQuestionEvent = new EventEmitter()

  @Output()
  questionsEvent = new EventEmitter()

  ngOnInit(): void {
  }

  searchQuestion() {
    console.log(this.searchText)
  }

  addQuestionClicked() {
    this.addQuestionEvent.emit("")
  }

  questionsClicked() {
    this.questionsEvent.emit("")
  }
}
