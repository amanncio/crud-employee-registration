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

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.put("/update", (req, res) =>{
    const id = req.body.id;
    const wage = req.body.wage;

    db.query(
        "UPDATE employees SET wage = ? WHEREid = ?",
        [wage, id],
        (err, result) => {
            if(err) {
                console.log(err)
            }else{
                res.send(result)
            }
        }
    );
})

// app.delete()

app.listen(3001, () =>{
    console.log("It's running...");
});



/*Model View Controller*/