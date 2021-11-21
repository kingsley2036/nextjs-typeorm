import "reflect-metadata";
import {createConnection} from "typeorm";
import {getDatabaseConnection} from '../lib/getDatabaseConnection';

createConnection().then(async connection => {
    const connect = await getDatabaseConnection()
    console.log('connect',connect);
    console.log(connection);
    connection.close()

}).catch(error => console.log(error));
