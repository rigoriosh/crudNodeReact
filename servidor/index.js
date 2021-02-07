const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'cruddatabase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res)=>{
    const sqlSelectStament = 'SELECT * FROM movie_reviews';
    db.query(sqlSelectStament, (err, result) => {
        console.log('result: ', result);
        const miRes = JSON.stringify(result);
        res.send(miRes)
    });
});

app.post("/api/insert", (req, resp) =>{

    const movie_name = req.body.movie_name;
    const movie_review = req.body.movie_review;

    const sqlInsertStament = 'INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?)';
    db.query(sqlInsertStament, [movie_name, movie_review], (err, result) => {
        console.log('err:', err)
        console.log('result: ', result);
    }); 
});
/* //prueba insercion data
app.get('/', (req, res) =>{
    const sqlInsertStament = 'INSERT INTO movie_reviews (movie_name, movie_review) VALUES ("walsStreet", "good movie");';
    db.query(sqlInsertStament, (err, result) => {
        res.send("hello Rigo")
    }); 
})
 */
app.listen(3001, ()=>{
    console.log('running o port 3001 hi');
})