
export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export class User {
    id: number
    name: string
    email: string
    image?: string
    token: string
    role: UserRole
}