INSERT INTO department (dept_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 90000, 1),
    ('Sales Team Member', 60000, 1),
    ('Software Engineer Manager', 150000, 2),
    ('Junior Software Engineer', 96000, 2),
    ('Financial Advisor Manager', 200000, 3),
    ('Junior Financial Advisor', 100000, 3),
    ('Legal Advisor', 2500000, 4),
    ('Junior Legal Support', 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Janet', 'Jackson', 2, 1),
    ('Morgan', 'Freeman', 1, null),
    ('Gordon', 'Ramsey', 4, 3),
    ('Xena', 'Warrior', 3, null),
    ('Oprah', 'Winfrey', 6, 5),
    ('Rhonda', 'Rousey', 5, null),
    ('Justin', 'Timberlake', 8, 7),
    ('Davey', 'Jones', 7, null);
