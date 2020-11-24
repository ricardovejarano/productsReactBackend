import { MongoDBConnection } from '../connections/mongoDB.connection';
import { DatabaseReferences } from '../../utils/constants';
import { MySqlConnection } from '../connections/mysql.connection';

export class FactoryDatabase {

    public getDatabaseInstance(databaseReference: string | undefined): MongoDBConnection | MySqlConnection {
        let instance: any;

        switch (databaseReference) {
            case DatabaseReferences.mongo:
                instance = new MongoDBConnection();
                break;
            case DatabaseReferences.mysql:
                instance = new MySqlConnection();
                break;
            default:
                instance = new MongoDBConnection();
                break;
        }
        return instance;
    }
}