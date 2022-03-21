// import mysql2
const mysql = require('mysql2');
// import inquirer
const inquirer = require('inquirer');
// import console.table
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

require('dotenv').config()

// connection to db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
    afterConnection();
});

// function when welcome image shows
afterConnecton = () => {
    console.log('**************************')
    console.log('***                    ***')
    console.log('***  Employee Manager  ***')
    console.log('***                    ***')
    console.log('**************************')
    promptUser();
};

//inquirer prompt
const promptUser = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View all departments',
                      'View all roles',
                      'View all employees',
                      'Add a department',
                      'Add a role',
                      'Add an employee',
                      'Update an employee role',
                      'Update an employee manager',
                      'View employees by department',
                      'Delete a department',
                      'Delete a role',
                      'Delete an employee',
                      'No Action']
        }
    ])
    .then((answers) => {
        const { choices } = answers;

        if (choices === "View all departments") {
            showDepartments();
        }

        if (choices === "View all roles") {
            showRoles();
        }

        if (choices === "View all employees") {
            showEmployees();
        }

        if (choices === "Add a department") {
            addDepartment();
        }

        if (choices === "Add a role") {
            addRole();
        }

        if (choices === "Add an employee") {
            addEmployee();
        }

        if (choices === "Update an employee role") {
            updateEmployee();
        }

        if (choices === "Update an employee manager") {
            updateManager();
        }

        if (choices === "View employees by department") {
            employeeDepartment();
        }

        if (choices === "Delete a department") {
            deleteDepartment();
        }

        if (choices === "Delete a role") {
            deleteRole();
        }

        if (choices === "Delete an employee") {
            deleteEmployee();
        }

        if (choices === "No Action") {
            connection.end()
        };
    });
};

// function to show departments
showDepartments = () => {
    console.log('Showing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

// function to show roles
showRoles = () => {
    console.log('Showing all roles...\n');

    const sql = `SELECT role.id, role.title, department.name AS department FROM role
                 INNER JOIN deparment ON role.department_id = department.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

// function to show employees
showEmployees = () => {
    console.log('Showing all employees...\n');

    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
                 CONCAT (manager.first_name, " ", manager.last_name) AS manager
                 FROM employee
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};


