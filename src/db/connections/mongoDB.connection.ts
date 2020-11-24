import mongoose from 'mongoose';
import { MongoDB } from '../../utils/constants';

import { DataBaseConnection } from "../interfaces/connection.interface";

export class MongoDBConnection implements DataBaseConnection {

    public async connectToDataBase(): Promise<any> {
        try {
            return await mongoose.connect(MongoDB.urlConnection, {
                useNewUrlParser: true
            });
        } catch (error) {
            throw new Error(error);
        }
    }

}