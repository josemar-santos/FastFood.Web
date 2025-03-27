export interface Category {
    id: string,
    name: string,
    description: string,
    icon: string,
    status: boolean,
    deleted: boolean
    createdAt: Date
}

export interface ICategory {
    name: string,
    description?: string,
    icon: FileList
}