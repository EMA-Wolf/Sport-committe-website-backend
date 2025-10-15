export interface IRepository <T>{
    findbyId(id: string): Promise<any>;
    findAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<void>;
}

export interface IService <T>{
    findbyId(id: string): Promise<any>;
    findAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<void>;
}

    