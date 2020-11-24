export enum MongoDB {
    urlConnection = 'mongodb+srv://userInterview:userInterview10@cluster0.esarq.mongodb.net/productsInterview?retryWrites=true&w=majority'
}

export enum DatabaseReferences {
    mongo = 'mongo',
    mysql = 'mysql',
    postgresQL = 'postgresQL'
}

export interface ReponseMessages {
    status: number;
    message: string;
    result: any;
}

export const getMessageFromParameter = (status: number,  message: string, result: any) => {
    const objResponse: ReponseMessages = { status, message, result }; 
    return objResponse;
}
