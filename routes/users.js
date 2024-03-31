const express = require('express');
const fs = require('fs');
const router = express.Router();

// Read users
router.get('/', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

// Create user
router.post('/', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            const users = JSON.parse(data);
            users.push(req.body);
            fs.writeFile('./data/users.json', JSON.stringify(users), err => {
                if (err) {
                    res.status(500).send('Server error');
                } else {
                    res.status(201).send('User created');
                }
            });
        }
    });
});

// Update user
router.put('/:id', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            const users = JSON.parse(data);
            const updatedUsers = users.map(user => user.id === req.params.id ? req.body : user);
            fs.writeFile('./data/users.json', JSON.stringify(updatedUsers), err => {
                if (err) {
                    res.status(500).send('Server error');
                } else {
                    res.send('User updated');
                }
            });
        }
    });
});

// Delete user
router.delete('/:id', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            const users = JSON.parse(data);
            const filteredUsers = users.filter(user => user.id !== req.params.id);
            fs.writeFile('./data/users.json', JSON.stringify(filteredUsers), err => {
                if (err) {
                    res.status(500).send('Server error');
                } else {
                    res.send('User deleted');
                }
            });
        }
    });
});

module.exports = router;