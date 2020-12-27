import { Category } from "../models/category.model"

export class CategoryResponse {
    success: boolean
    data: Category
}

export class CategoryListResponse {
    success: boolean
    data: Category[]
}