const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3301,
    user: 'root',
    password: 'root',
    database: 'company_db'
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    firstPrompt();
});

function firstPrompt() {

    inquirer
        .prompt({
            name: 'task',
            type: 'list',
            message: "What would you like to do?",
            choices: [
                'View Employees',
                'Add Employee',
                'Remove Employees',
                'Update Employee Role',
                'End'
            ]
        })
    .then(function ({ task }) {
        switch (task) {
            case 'View Employees':
                viewEmployee();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employees':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;

            case 'End':
                connection.end();
                break;
        }
    });
}

//====== READ, SELECT * FROM
function viewEmployee() {
    console.log('Viewing employees\n');

var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, e.manager_id AS manager
    FROM employee e
    JOIN role r
        ON e.role_id = r.id
    JOIN department d
        ON d.id = r.department_id`

connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log('------Successful!----------\n');

    firstPrompt();
});
}

//============CREATE: INSERT INTO

function addEmployee() {
    console.log('Adding a new employee!')

var query =
    `SELECT r.id, r.title, r.salary
    FROM role r`

connection.query(query, function (err, res) {
    if (err) throw err;

    const insertRoleChoices = res.map(({ id, title, salary }) => ({
        title: `${title}`, salary: `${salary}`,
        value: id
    }));

    console.table(res);
    console.log('Role to Insert!');
});
}

function promptInsert(promptInsertEmployee) {
    inquirer
    .prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the employee\'s first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the employee\'s last name?'
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'What is the employee\'s role id?',
            choices: insertRoleChoices
        }
    ])
    .then(function(answer) {
        console.log('Inserting a new employee!');

        connection.query(
            `INSERT INTO employee SET ?`,
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id
            },
            function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log(res.affectedRows + 'Inserted successfully!\n');

                firstPrompt();
            });
    });
}

//================DELETE, DELETE FROM

function removeEmployee() {
    console.log('Deleting an employee!!');

    var query =
    `SELECT e.id, e.first_name, e.last_name
    FROM employee e`

    connection.query(query, function (err, res) {
        if (err) throw err;

    const deleteArrayChoices = res.map(({ id, first_name, last_name }) => ({
        id: `${id}`,
        name: `${first_name} ${last_name}`,
        value: id
    }));

    console.table(res);
    console.log('Array to Delete!\n');

    promptDelete(deleteArrayChoices);
    });
}

function promptDelete(deleteArrayChoices) {
    inquirer
    .prompt([
        {
            name: 'employeeId',
            type: 'list',
            message: 'Which employee do you want to remove?',
            choices: deleteArrayChoices
        }
    ])
    .then(function (answer) {
        // after prompting, insert a new item into the db with that info
        connection.query(
            `DELETE FROM employee WHERE id = ?`, { employeeId: answer.employeeId }, function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log(res.affectedRows + 'Deleted successfully!\n');

                firstPrompt();
            });
    });
}

//================UPDATE

function updateEmployeeRole() {
    console.log('Updating a role');

    var query =
    `SELECT r.id, r.title, r.salary
    FROM role r`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            title: `${title}`,
            salary: `${salary}`,
            value: id
        }));

        console.table(res);
        console.log('Array to Update!\n');

        updateEmployeeRole(roleChoices);
    });
}

function updateEmployee() {
    console.log('Updating an employee!');

    var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, e.manager_id AS manager
    FROM employee e
    JOIN role r
        ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const employeeChoices = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        console.table(res);
        console.log('Array to Update 2!\n');

        updateEmployeeRole(employeeChoices);
    });
}

function updateEmployeeRole(roleChoices, employeeChoices) {
    inquirer
    .prompt([
        {
            name: 'roleId',
            type: 'list',
            message: 'Which role do you want to update?',
            choices: roleChoices
        },
        {
            name: 'employeeId',
            type: 'list',
            message: 'Which employee do you want to assign to the role?',
            choices: employeeChoices
        },
    ])
    .then(function (answer) {

        // when finished prompting, insert a new intem into the database with that info
        var query = connection.query(
            `UPDATE employee SET role_id ? WHERE id = ?`, [roleId, employeeId], function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log(res.affectedRows + 'Updated successfully!');

                firstPrompt();
            });
    });
}

// const seedItems = require('./item-seeds');
// const seedUser = require('./user-seeds');

// const sequelize = require('../config/connection');

// const seedAll = async () => {
//     await sequelize.sync({ force: true });
//     console.log('\n---- DATABASE SYNCED ----\n');
//     await seedUser();
//     console.log('\n---- USERS SEEDED ----\n');
//     await seedItems();
//     console.log('\n---- ITEMS SEEDED ----\n');

//     process.exit(0);
// };

// seedAll();
