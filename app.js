  
// Variables y expresiones del servidor
const express = require('express');
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const puerto = 8080;
const router = express.Router();
app.use('/api', router);

app.use(express.static('public'));

// Hago la importación de los módulos necesarios para trabajar
const archivo = require('./productos/archivo');
const Productos = require('./productos/productos');

// Me devuelve un json con todos los productos, en caso contrario, devuelve un mensaje de error
router.get('/productos/listar', async (req, res) =>{
    const listaProductos = await archivo.read();
    if(!listaProductos.length){
        res.send({error: 'sin productos cargados'});
    } else{
        res.send(listaProductos);
    }
});

// Me devuelve un json con el producto del id enviado
router.get('/productos/listar/:id', async (req, res) =>{
    const listaProductos = await archivo.read();
    const product = listaProductos.find( product => product.id == req.params.id);
    if(!product){
        res.send({error: 'Producto no encontrado'});
    } else{
        res.send(product);
    }
});

// Almaceno el producto
router.post('/productos/guardar/', async (req, res) =>{
    const product = await new Productos(req.body.title, req.body.price, req.body.thumbnail);
    res.send(await archivo.create(product));
})

router.put('productos/actualizar/:id', async (req, res) => {

})

router.delete('productos/borrar/:id', async (req, res) => {
    
})

const server = app.listen(puerto, () =>{
    console.log(`http://localhost:${puerto}`);
})

server.on('error', err =>{
    console.log(`Error en el servidor: ${err}`)
})