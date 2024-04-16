const express = require('express')

//Va en minuscula porque es una variable
const productManager = require('./ProductManager');

const app = express()

const PORT = 8080

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const product = new productManager()

//Aca adentro ponemos todo lo que nos devuelve el json de nuestros productos

app.get('/products', async (req, res) => {
    try {

        const products = await product.getProducts()
        //Obtengo el valor del parametro en la query, en este caso, "limit"
        const limit = parseInt(req.query.limit);
        //Si no es numero y es mayor a 0
        if (!isNaN(limit) && (limit > 0)) {
            //Copio el array de productos hasta la cantidad limite
            const productsLimited = products.slice(0, limit)
            //Lo envio como respuesta
            return res.json(productsLimited);
        } else {
            //Caso contrario, envio la lista completa

            return res.json(products);
        }

    } catch (error) {

        return res.send({ error: 'Error al pedir los productos' })
    }

})


app.get('/products/:idProduct', async (req, res) => {
    try {
        //Guardo el parametro pasado por la url
        //Uso parseInt para poder convertilo en numero al parametro
        const idProduct = parseInt(req.params.idProduct);
        //Uso el metodo que busca por ID y el resultado lo guardo
        const findProduct = await product.getProductById(idProduct) 
        //Consulto si no es encontrado
        if (!findProduct) {
            return res.send("Producto no encontrado")
        }
        //Muestro si lo encontre
        res.send(findProduct);
    } catch (error) {
        return res.send({ error: 'Error al pedir los productos' })
    }

})

app.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto 8080");
})