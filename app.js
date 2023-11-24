const express = require('express');
const cors = require('cors');  // Import the cors middleware

const employeeController = require('./employeeController');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());
app.use(cors());

// CRUD Operations

// Create employee
app.post('/employees', (req, res) => {
    employeeController.createEmployee(req.body, (err, employee) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(employee);
    });
});

// Read all employees
app.get('/employees', (_, res) => {
    employeeController.getAllEmployees((err, employees) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(employees);
    });
});

app.get('/eps', (_, res) => {
    employeeController.getAllEps((err, employees) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(employees);
    });
});

// Read single employee
app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    employeeController.getEmployeeById(id, (err, employee) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(employee);
    });
});

// Update employee
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    employeeController.updateEmployeeById(id, req.body, (err, employee) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(employee);
    });
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    employeeController.deleteEmployeeById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(result);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
