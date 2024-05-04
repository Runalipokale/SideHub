// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const path = require('path');

// app.use(express.static(path.join(__dirname,'views')));

// // Create a database connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root123',
//     database: 'sideHub',
// });


// // Establish the database connection
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database');
// });

// // Define a route to retrieve data from the database
// app.get('/services', (req, res) => {
//     const query = 'SELECT * FROM services';
//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             res.status(500).send('Error fetching data from the database');
//         } else {
//             // Render an EJS template and pass the data
//             res.render('./categories', { data: results });
//         }
//         console.log('success');
//     });
// });

module.exports = connection;