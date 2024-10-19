import { DatabaseClient } from "./DatabaseClient";
import { Employee } from "..//persistence//models/Employee"
import { EmployeeSal } from "..//persistence//models/EmployeeSal";
import credentials from '..//..//credentials.json';

let openSql = new DatabaseClient();
let connectionString = credentials.dbConnectionString;

export class DatabaseHelper {

    async getEmployeeData(): Promise<Employee[]> {
        const result = openSql.executeQueryFirstOrDefaultAsync("Select Top 1 * from tb_employees", connectionString) //inline sql query
        const employees: Employee[] = (await result).recordset.map(row => ({
            EmployeeId: row.EmployeeId,
            EmployeeDescription: row.EmployeeDescription
        }))
        return employees;
    }

    async getSalaryForEmployee(): Promise<EmployeeSal[]> {
        const params = { employeeId: 102 };
        const result = openSql.executeProcAsync(params, 'pr_GetEmployeeSalary.sql', connectionString)
        const employSal: EmployeeSal[] = (await result).recordset.map(row => ({
            EmployeeId: row.EmployeeId,
            EmployeeSalary: row.EmployeeSalary
        }))
        return employSal;
    }
}