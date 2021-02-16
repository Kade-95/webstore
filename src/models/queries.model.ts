export interface Base {
    _id?: string;
}

export type LocalDocument<T> = {
    [P in keyof (T & Base)]: (T & Base)[P]
}

export interface CustomType {
    [key: string]: any
}