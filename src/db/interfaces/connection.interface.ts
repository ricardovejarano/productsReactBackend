export interface DataBaseConnection {
    /**
     * Method to connect to databse
     * 
     */
    connectToDataBase(): Promise<any>;
}