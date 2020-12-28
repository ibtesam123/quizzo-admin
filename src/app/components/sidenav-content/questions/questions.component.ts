import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  searchText: string = ""

  ngOnInit(): void {
  }

  searchQuestion() {
    console.log(this.searchText)
  }

}
