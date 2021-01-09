import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService
  ) { }

  categoryList: Category[] = []

  ngOnInit(): void {
    if (!this.apiService.categoryList)
      this.apiService.getAllCategory().then(_ => {
        this.categoryList = this.apiService.categoryList
        if (this.categoryList.length == 0)
          this.categoryID = -1
        else
          this.categoryID = this.categoryList[0].id
      })
    else {
      this.categoryList = this.apiService.categoryList
      if (this.categoryList.length == 0)
        this.categoryID = -1
      else
        this.categoryID = this.categoryList[0].id
    }
  }

  @Output()
  backEvent = new EventEmitter()

  question: string = ""
  categoryID: number
  option1: string = ""
  option2: string = ""
  option3: string = ""
  option4: string = ""
  answer: number = 0
  imageURL: string
  quesLoading: boolean = false
  error: string
  file: File

  backClicked() {
    this.backEvent.emit("")
  }

  setOption(i: number) {
    this.answer = i
  }

  selectImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.file = event.target.files[0]

      reader.readAsDataURL(this.file); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageURL = event.target.result as string;
      }
    }
  }

  async addQuestion() {
    this.quesLoading = true
    let res = await this.apiService.addQuestion(
      this.question,
      [
        this.option1,
        this.option2,
        this.option3,
        this.option4,
      ],
      this.answer,
      this.categoryID,
      this.file
    )

    if (res) {
      this.quesLoading = false
      this.backEvent.emit("")
      this.error = undefined
    } else {
      this.quesLoading = false
      this.error = this.apiService.error
    }

  }

}
