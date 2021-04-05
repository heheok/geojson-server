const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression')

var fs = require('fs');

const app = express();
app.use(cors());




app.use(compression());

app.get('/', (req, res) => {
    let count = req.query.cnt || 25;
    fs.readFile(`${__dirname}/processed${count}K.json`, (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

app.listen(3000, () => console.log('Gator app listening on port 3000! '));
