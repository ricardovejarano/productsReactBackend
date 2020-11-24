import { DataBaseConnection } from "../interfaces/connection.interface";

export class MySqlConnection implements DataBaseConnection {

    public async connectToDataBase(): Promise<any> {
        // MySQL connecion implementation
        return Promise.resolve();
    }

}