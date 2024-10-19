import { test, expect } from '@playwright/test';
import { DatabaseHelper } from '../framework/persistence/DatabaseHelper';
import { Employee } from "../framework/persistence/models/Employee";
import { EmployeeSal } from "../framework/persistence/models/EmployeeSal";

let employeeDb = new DatabaseHelper();

test('Get 1st Employee from Db', async ({ }) => {
  let executeDb : Employee[] = await employeeDb.getEmployeeData();
  let employeeId = executeDb[0].EmployeeId;
  let employeedesc = executeDb[0].EmployeeDescription;
  await expect(employeeId).toEqual(103);
  await expect(employeedesc).toEqual('Bob');
});


test('Get Salary from Db', async ({ }) => {
  let executeDb : EmployeeSal[] = await employeeDb.getSalaryForEmployee();
  let employeeId = executeDb[0].EmployeeId;
  let employeeSal = executeDb[0].EmployeeSalary;
  await expect(employeeId).toEqual(103);
  await expect(employeeSal).toEqual(20325);
});