import { User } from "../models/user.model"

export class UserResponse {
    success: boolean
    data: User
}