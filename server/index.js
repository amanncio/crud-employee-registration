// const axios = require('axios');
const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors")

app.use(cors());
app.use(express.json());

app.post("/create",(req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
        [name, age, country, position, wage],
        (err, result) => {
            if(err) {
                console.log(err)
            }else{
                res.send("Valores inseridos no banco de dados!")
            }
        }
    );
});


app.listen(3001, () =>{
    console.log("It's running...");
});



/*Model View Controller*/