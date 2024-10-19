import * as sql from 'mssql';
import * as fs from 'fs';
import * as path from 'path';
import config from "..//..//config.json"

export class DatabaseClient {
    private async openConnection(connectionString: string): Promise<sql.ConnectionPool> {
        try {
            let sqlConntection = await sql.connect(connectionString);
            return sqlConntection
        } catch (error) {
            console.log(error);
            return Promise.reject("Error connecting to database")
        }
    }

    async executeQueryFirstOrDefaultAsync(query: string, connectionString: string): Promise<sql.IResult<any>> {
        let sqlconnection = await this.openConnection(connectionString)
        try {
            const result = await sqlconnection.query(query);
            sqlconnection.close();
            return result;
        } catch (error) {
            console.log(error)
            sqlconnection.close();
            return Promise.reject('Error executing database query')
        }
    }

    async executeProcAsync(params: { [key: string]: any }, storeProcedure: string, connectionString: string): Promise<sql.IResult<any>> {
        let sqlconnection = await this.openConnection(connectionString);
        const query = fs.readFileSync(path.join(config.sqlScriptLocation, storeProcedure), 'utf8'); // finds the stored procedure in the specfic directory
        try {
            const request = sqlconnection.request();
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value)
            }
            const result = await request.query(query);
            sqlconnection.close();
            return result;
        } catch (error) {
            console.log(error)
            sqlconnection.close();
            return Promise.reject('Error executing database query')
        }
    }
}