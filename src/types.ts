export interface User {
    id: number
    name: string
}

export interface GraphQLInput<T> {
    input: T
}

export interface UserInput {
    name: string
}