const express = require("express");
const menu = require('./menu.json');
const app = express();
const port = 3000;

app.use(express.json());

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

// Server running
app.listen(port, () => {
    console.log(`Aquí está corriendo el servidor ${port}`)
})



