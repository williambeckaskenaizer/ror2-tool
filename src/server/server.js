const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'lol',
    database: 'ror2'
});


const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/api/items', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM item;', (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json({
                    results
                })
            }
        });
    });
});

app.get('/api/survivors', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM survivor;', (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json({
                    results
                })
            }
        });
    });
});
app.get('/api/chests', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM chest;', (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json({
                    results
                })
            }
        });
    });
});
app.get('/api/environments', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM environment', (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json({
                    results
                })
            }
        });
    });
});
app.get('/api/enemies', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM enemy', (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json({
                    results
                })
            }
        });
    });
});
app.get('/api/bosses', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM boss', (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json({
                    results
                })
            }
        });
    });
});
app.get('/api/challenges', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM challenge', (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json({
                    results
                })
            }
        });
    });
});
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(8000, () => {
    console.log('started')
})