import { Question } from "../models/question.model"

export class QuestionResponse {
    success: boolean
    data: Question
}

export class QuestionListResponse {
    success: boolean
    data: Question[]
}