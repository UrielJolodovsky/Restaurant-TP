const express = require("express");
const mysql = require("mysql2");
const menu = require('./menu.json');
const app = express();
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"test",
})

connection.connect((err) => {
    if (err) 
        console.log(err)
    else 
        console.log("> Connected to database");
})

// Ejercicio 1
app.get('/menu', (req, res) => {
    res.json(menu);
})

// Ejercicio 2
app.get('/menu/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const plato = menu.find((plato => plato.id === id))
    res.json(plato);    
})

// Ejercicio 3
app.get('/principales', (req, res) => {
    const plato_principal = menu.filter((menu) => menu.tipo === "principal");
    res.json(plato_principal);
})

// Ejercicio 4
app.get('/postres', (req, res) => {
    const postres = menu.filter((menu) => menu.tipo === "postre");
    res.json(postres);
})

// Ejercicio 5
app.get('/bebidas', (req, res) => {
    const bebidas = menu.filter((menu) => menu.tipo === "bebida")
    res.json(bebidas);
})

// Ejercicio 6
app.post('/pedido', (req, res) => {
    const pedido = req.body.productos;
    let precio_total = 0;
    pedido.forEach(element => {
        precio_total += menu.find((menu) => menu.id === element.id).precio * element.cantidad;
    });

    res.json({"msj": "Pedido recibido", "precio":  precio_total});
}) 

app.get('/users', (req, res) => {
    connection.query("SELECT * FROM users", (err, rows, fields) => {
        if (err)
            console.log(err);
        
        res.json(rows);
    })
})

app.post('/login', (req, res) => {
    if (!req.body.username || req.body.password)
        return res.status(400).send("Faltan datos");
    
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM users WHERE username = " + username, (err,rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al loguearse");
        }
        if (!rows.length)
            return res.send("Wrong username");
        if (rows[0].password === password)
            res.send("Logged succesfully");
        else
            res.send("Wrong password");
    });
});


// Server running
app.listen(port, () => {
    console.log(`> Aquí está corriendo el servidor ${port}`);
});

// npm i mysql2

