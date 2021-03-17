const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); /* for policy error of cors */
const app = express();
const mysql = require('mysql');
const { response } = require('express');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));//for paramas that come to url

/* create a conection pool to DB */
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'programacredito'
});

app.get('/api/get', (req, res)=>{
    console.log('ingreso al servidor')
    const sqlSelectStament = 'SELECT * FROM movie_reviews';
    db.query(sqlSelectStament, (err, result) => {
        //console.log('result: ', result);
        if(err) res.send(err)
        console.log(' okresult: get');
        const miRes = JSON.stringify(result);
        res.send(miRes)
    });
});

app.get('/getProfes', (req, resp) => {
    //console.log('req: ', req);
    //console.log('resp: ', resp);
    const sqlStament = 'SELECT * FROM teachers';
    db.query(sqlStament, (err, result) => {
        if(err) resp.send(err)
        const miRes = JSON.stringify(result);
        resp.send(miRes)
    })
});

app.get('/getMaterias', (req, resp) => {
    //console.log('req: ', req);
    //console.log('resp: ', resp);
    const sqlStament = 'SELECT * FROM materias';
    db.query(sqlStament, (err, result) => {
        if(err) resp.send(err)
        const miRes = JSON.stringify(result);
        resp.send(miRes)
    })
});

app.get('/getUsers', (req, resp) => {   
    const sqlStament = 'SELECT * FROM users';
    db.query(sqlStament, (err, result) => {
        if(err) resp.send(err)
        const miRes = JSON.stringify(result);
        resp.send(miRes)
    })
});

app.get('/getRoles', (req, resp) => {   
    const sqlStament = 'SELECT * FROM roles';
    db.query(sqlStament, (err, result) => {
        if(err) resp.send(err)
        const miRes = JSON.stringify(result);
        resp.send(miRes)
    })
});

app.post("/api/insert", (req, resp) =>{

    const movie_name = req.body.movie_name;
    const movie_review = req.body.movie_review;

    const sqlInsertStament = 'INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?)';
    db.query(sqlInsertStament, [movie_name, movie_review], (err, result) => {
       
        console.log(' okresult: post');
    }); 
});

app.post("/register", (req, resp)=>{
    console.log('ingreso al servidor')
    const username = req.body.username, password = req.body.password, email = req.body.email;
    const stament = "INSERT INTO users (username, password, email) VALUES (?,?,?)"
    db.query(stament, [username, password, email], (err, result) => {
        console.log("err:", err);
        resp.send(result);
    })
});

app.post('/addProfessor', (req, resp) => {
    const nombre_profesor = req.body.nombre_profesor, apellido_profesor = req.body.apellido_profesor, profesion = req.body.profesion;
    const stament = "INSERT INTO teachers (nombre_profesor, apellido_profesor, profesion) VALUES (?,?,?)";
    db.query(stament, [nombre_profesor, apellido_profesor, profesion], (err, result) => {
        console.log("err:", err);
        resp.send(result)
    })
});

app.post('/addMaterias', (req, resp) => {
    const nombre_materia = req.body.nombre_materia, creditos_materia = req.body.creditos_materia, idteachers = req.body.idprofesors;
    const stament = "INSERT INTO materias (idteachers, nombre_materia, creditos_materia) VALUES (?,?,?)";
    console.log(idteachers, nombre_materia, creditos_materia);
    db.query(stament, [idteachers, nombre_materia, creditos_materia], (err, result) => {
        console.log("err:", err);
        resp.send(result)
    })
});

app.post('/addSemestre', (req, resp) => {
    const firstMat = req.body.firstMat;
    const secondMat = req.body.secondMat;
    const thirdMat = req.body.thirdMat;
    const idusers = req.body.idusers;
    const stament = "INSERT INTO materselected (firstMat, secondMat, thirdMat, idusers) VALUES (?,?,?,?)";
    db.query(stament, [firstMat, secondMat, thirdMat, idusers], (err, result) => {
        console.log("err:", err);
        resp.send(result)
    })
})

app.post("/login", (req, response) => {
    console.log('in request /login')
    const username = req.body.username, password = req.body.password;
    const stament = "SELECT * FROM users WHERE username = ? AND password = ?";    
    db.query(stament, [username, password], (err, result) => {        
        if (err) {
            response.send({err});
        } 
        
        (result.length > 0)
        ? response.send(result)
        : response.send({message: "Wrong username/password combination!"});
    
        
    })
});

app.post("/getUserByNameAndEmail", (req, response) => {
    console.log('in request /login')
    const username = req.body.name;
    const email = req.body.email;
    
    const stament = "SELECT * FROM users WHERE username = ? AND email = ?";    
    db.query(stament, [username, email], (err, result) => {        
        if (err) {
            response.send({err});
        } 
        
        (result.length > 0)
        ? response.send(result)
        : response.send({message: "Wrong, we don't get information!"});
    
        
    })
});

app.post("/getClasById", (req, response) => {
    const idclases = req.body.idclases;
    
    const stament = "SELECT * FROM clases WHERE idclases = ?";    
    db.query(stament, [idclases], (err, result) => {        
        if (err) {
            response.send({err});
        } 
        
        (result.length > 0)
        ? response.send(result)
        : response.send({message: "Wrong, we don't get information!"});
    })
});

app.post("/getMaterSelectedById", (req, response) => {
    const idmaterSelected = req.body.idmaterSelected;
    
    const stament = "SELECT * FROM materselected WHERE idmaterSelected = ?";    
    db.query(stament, [idmaterSelected], (err, result) => {        
        if (err) {
            response.send({err});
        } 
        
        (result.length > 0)
        ? response.send(result)
        : response.send({message: "Wrong, we don't get information!"});
    })
});

app.get('/getClases', (req, resp) => {   
    const sqlStament = 'SELECT * FROM clases';
    db.query(sqlStament, (err, result) => {
        if(err) resp.send(err)
        const miRes = JSON.stringify(result);
        resp.send(miRes)
    })
});


app.delete("/api/delete/:movie_name", (req, resp) => {
    const name = req.params.movie_name;
    const sqlStament = 'DELETE FROM movie_reviews WHERE movie_name = ?';
    db.query(sqlStament, name, (err, result) => {
        /* console.log('err:', err)
        console.log('result: ', result); */
        console.log(' okresult: delete');
    }); 
});
app.put("/api/update", (req, resp) => {
    const name = req.body.movie_name;
    const review = req.body.movie_review;
    const sqlStament = 'UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?';
    db.query(sqlStament, [review, name], (err, result) => {                
        resp.send(result);
    }); 
});

app.put("/updateUserRol", (req, resp) => {    
    const idusers = req.body.idusers;
    const idRol = req.body.idRol;
    const sqlStament = 'UPDATE users SET rol = ? WHERE idusers = ?';
    db.query(sqlStament, [idRol, idusers], (err, result) => {                
        resp.send(result);
    }); 
});

app.put('/updateUserClaseSemestre',(req, resp) => {
    const idclases = req.body.idclases;
    const idmaterSelected = req.body.idmaterSelected;
    const idusers = req.body.idusers;
    const sqlStament = 'UPDATE users SET idclases = ?, idmaterSelected = ?  WHERE idusers = ?';
    db.query(sqlStament, [idclases, idmaterSelected, idusers], (err, result) => {
        console.log('err: ', err);
        resp.send(result);
    })
});
app.listen(3001, ()=>{
    console.log('hi Rigo i"m running on port 3001');
});



/* const test = ()=>{
    
    const stament = "INSERT INTO materSelected (firstMat, secondMat, thirdMat, idusers) VALUES (?,?,?,?)";
    db.query(stament, ['ingles', 'fisica', 'math', 2], (err, result) => {
        console.log("err:", err);
        console.log(result);
        //resp.send(result)
    })
}

test(); */