import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService,
  ) { }

  @Output()
  backEvent = new EventEmitter()

  error: string

  @Input()
  idEdit: boolean

  @Input()
  catName: string

  catLoading: boolean

  imgUrl: string

  file: File

  ngOnInit(): void {
    this.catLoading = false
    if (!this.idEdit) {
      this.catName = ""
    }
  }

  backClicked() {
    this.backEvent.emit("")
  }

  selectImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.file = event.target.files[0]

      reader.readAsDataURL(this.file); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imgUrl = event.target.result as string;
      }
    }
  }

  async uploadCategory() {
    this.catLoading = true
    let res = await this.apiService.addCategory(this.catName, this.file)

    this.catLoading = false

    if (!res)
      this.error = this.apiService.error
    else {
      this.error = undefined
      this.catName = ""
      this.imgUrl = ""
    }
  }

}
