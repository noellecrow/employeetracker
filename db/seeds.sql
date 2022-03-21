INSERT INTO departments (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 90000, 1),
    ('Sales Team Member', 60000, 1),
    ('Junior Software Engineer', 96000, 2),
    ('Senior Software Engineer', 150000, 2),
    ('Junior Financial Advisor', 100000, 3),
    ('Senior Financial Advisor', 200000, 3),
    ('Legal Advisor', 2500000, 4);
