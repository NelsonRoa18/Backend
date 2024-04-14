
const fs = require('fs').promises

class ProductManager {

    constructor() {
        this.path = "Products.json"
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            //Primero leemos el archivo para obtener los items del json
            const products = await this.getProducts();
            //Genero el id autogenerable con el largo del array
            const product_id = products.length + 1;
            //Metodo para buscar 
            const findProduct = products.find((product) => product.id === product_id);

            if (!findProduct) {
                const prod = {
                    id: product_id,
                    code,
                    title,
                    description,
                    price,
                    thumbnail,
                    stock
                }
                //Agregamos el item nuevo en el listado
                products.push(prod);
                //Escribimos en el archivo nuevamente
                await fs.writeFile(this.path, JSON.stringify(products, null, 2))

            } else {
                console.log("Error producto ya creado")
            }

        } catch (error) {
            console.error("Error al crear producto", error);
        }
    }

    async getProducts() {
        //Metodo para obtener todos los productos
        try {
            //Leo el archivo
            const data = await fs.readFile(this.path, 'utf-8')
            //Tengo que transformar lo que me devuelve (texto) en un objeto
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async getProductById(idProduct){
        try {
            //Traigo todos los elementos del json con este metodo
            const products = await this.getProducts();
            //Busco el producto
            const findProduct = products.find((product) => product.id === idProduct)

            if (!findProduct) {
                console.log("Error no hay producto con ese id")
            }else{
                console.log(findProduct);
            }
        } catch (error) {
            console.error("Error al buscar el producto por ID", error);
        }
    }
    async updateProduct(idProduct, title, description, price, thumbnail, code, stock) {
        try {
            //Leemos el archivo para obtener el listado
            const products = await this.getProducts();

            //Buscamos el item que coincida el id dentro de el listado
            //En esta variable se guarda el producto con esa ID
            const findProduct = products.find((product) => product.id === idProduct)
            
            //Si no lo encuentra
            if (!findProduct) {
                console.log("Producto inexistente")
            }//Si lo encuentra
            else{
                //Modifico los campos que le solicito a la persona
                findProduct.title = title,
                findProduct.description = description,
                findProduct.price = price,
                findProduct.thumbnail = thumbnail,
                findProduct.code = code,
                findProduct.stock = stock
                
                //Guardo en una variable los nuevos datos 
                const productUpdate = JSON.stringify(products, null, 2)
                
                //Los escribo nuevamente en mi JSON
                await fs.writeFile(this.path, productUpdate);
            }
        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(idProduct) {
        try {
            //Traigo todos los items con el metodo getproducts
            const products = await this.getProducts()

            const findProduct = products.find((product) => product.id === idProduct)

            if (!findProduct) {
                console.log("Error ID no encontrado")
            }else{
                //Borro de mi lista de productos el producto encontrado
                products.pop(product);
                //Guardo el listado modificado, lo transformo en JSON
                const productsUpdate = JSON.stringify(products, null, 2)
                //Escribo nuevamente en mi archivo JSON
                await fs.writeFile(this.path, productsUpdate)
                console.log("Elemento borrado con exito")
            }
        } catch (error) {
            console.error("Error no se pudo borrar el item", error);
        }
    }

}

//Creamos una nueva intancia de la clase
const product = new ProductManager()

product.getProducts()
    .then(products => console.log('Productos', products))
    .catch(error => console.log('El error es ', error)) 


//product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

/* product.getProducts()
    .then(products => console.log('Productos', products))
    .catch(error => console.log('El error es ', error)) 
 */


//product.getProductById(2);

//product.updateProduct(1, "Queso", "Fiambre de vaca", 100, "pipumpam", 124, 15)

//product.deleteProduct(5)




