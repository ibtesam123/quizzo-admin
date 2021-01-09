import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService,
  ) { }

  @Input()
  categoryID: number

  @Output()
  backEvent = new EventEmitter()

  questionLoading: boolean = false
  questionList: Question[] = []
  catName: string = ""

  ngOnInit(): void {
    this.questionLoading = true
    this.catName = this.apiService.categoryList.filter(c => c.id === this.categoryID)[0].name
    this.apiService.getQuestionsForCategory(this.categoryID, 0)
      .then((qList) => {
        this.questionLoading = false
        this.questionList = qList
      })
  }

  backClicked() {
    this.backEvent.emit("")
  }

  imageClicked(i: number) {
    if (this.questionList[i].image === null)
      return
    else
      window.open(this.questionList[i].image, '_blank')
  }

}
