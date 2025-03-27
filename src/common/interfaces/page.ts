export interface Page<T> {
    meta: Meta
    content: Array<T>
}

export interface Meta {
    total: number,
    page: number,
    perPage: number
}