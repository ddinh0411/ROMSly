// server.js

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Update with your desired port

const connection = mysql.createConnection({
  host: '34.82.63.59',
  user: 'root',
  password: '5.cDl@R|{eh)y"u-',
  database: 'ROMSly',
});

app.get('/getDropdownOptions', (req, res) => {
  const query = 'SELECT DrinkName FROM DrinkMenu';
  connection.query(query, (err, results) => {
    if (err) throw err;

    const options = results.map((result) => [result.column_name, result.column_name]);
    res.json(options);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
