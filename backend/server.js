import express from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json()); //middleware
app.use(cors()); //cors

const conn = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wedding'
})

conn.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Database connection established");
    }
})

//login POST REQUEST HANDLER

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        const sqlQry = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`

        conn.query(sqlQry, (error, result) => {
            console.log(result);
             
            if (error) throw error;

            if (result.length > 0) {

                // req.session.loggedin = true;
                // req.session.email = email;

                res.send({message: "success"});
            }else{
                res.send({message: "incorrect"});
            }

  })
        
    }else{
        res.send({message:"Please enter email and password"})
    }
  
})


//Register POST REQUEST HANDLER

app.post('/addUser', (req, res) => {

    const insertQry = `INSERT INTO user (email, location, password, type, username)  VALUES('${req.body.email}', '${req.body.location}', '${req.body.password}', '${req.body.type}', '${req.body.username}')`;

    console.log(req.body);

    conn.query(insertQry, (error, result) => {
            if(error) {
                res.status(500).send({message:'error'})
            }else{
                res.status(200).send({message:'success'})
            }
    })
})



//USERQUERIES POST REQUEST HANDLER
app.post('/addContact', (req, res) => {

    console.log(req.body);
    const insertQry = `INSERT INTO contact_form (email, name, phone, query) VALUES('${req.body.email}', '${req.body.name}', ${req.body.phone}, '${req.body.query}')`

    conn.query(insertQry, (error, result) => {
            if(error) {
                res.status(500).send({message:'error'})
            }else{
                res.status(200).send({message:'success'})
            }
    })
})




app.listen(8080);