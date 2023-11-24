const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('employees.db');

// Create Employee table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullNameCode TEXT,
    dependency TEXT,
    position TEXT,
    hireDate TEXT,
    epsId INTEGER,
    pensionContribution TEXT,
    salary INTEGER,
    novelties TEXT,
    FOREIGN KEY (epsId) REFERENCES eps(id)
  )
`);

// Create EPS table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS eps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    epsName TEXT
  );
`);

db.run(`INSERT INTO eps (epsName) VALUES ('Famisanar')`)

// Create employee
function createEmployee({ fullNameCode, dependency, position, hireDate, epsId, pensionContribution, salary, novelties }, callback) {
    db.run('INSERT INTO employees (fullNameCode, dependency, position, hireDate, epsId, pensionContribution, salary, novelties) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [fullNameCode, dependency, position, hireDate, epsId, pensionContribution, salary, novelties],
        function (err) {
            if (err) {
                return callback(err, null);
            }

            callback(null, {
                id: this.lastID,
                fullNameCode,
                dependency,
                position,
                hireDate,
                epsId,
                pensionContribution,
                salary,
                novelties
            });
        });
}

// Read all employees
function getAllEmployees(callback) {
    db.all('SELECT * FROM employees', (err, rows) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows);
    });
}

// Read all employees
function getAllEps(callback) {
    db.all('SELECT * FROM eps', (err, rows) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows);
    });
}

// Read single employee
function getEmployeeById(id, callback) {
    db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, row);
    });
}

// Update employee
function updateEmployeeById(id, { name, position, department }, callback) {
    db.run('UPDATE employees SET name = ?, position = ?, department = ? WHERE id = ?', [name, position, department, id], function (err) {
        if (err) {
            return callback(err, null);
        }

        if (this.changes === 0) {
            return callback({ message: 'Employee not found' }, null);
        }

        callback(null, { id, name, position, department });
    });
}

// Delete employee
function deleteEmployeeById(id, callback) {
    db.run('DELETE FROM employees WHERE id = ?', [id], function (err) {
        if (err) {
            return callback(err, null);
        }

        if (this.changes === 0) {
            return callback({ message: 'Employee not found' }, null);
        }

        callback(null, { message: 'Employee deleted successfully' });
    });
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
    getAllEps,
};
