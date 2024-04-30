import { promises as fs } from 'fs';

const file = './data/productos.json'

class ProductManager  {
    constructor(){
        this.path = file
    }

    async addProduct(title, description, price, code) {
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
                    price
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

    async deleteProduct(idProduct) {
        try {
            //Traigo todos los items con el metodo getproducts
            const products = await this.getProducts()
            console.log(idProduct);
            const findProduct = products.find((product) => product.id === idProduct)

            if (!findProduct) {
                console.log("Error ID no encontrado")
            }else{
                //Borro de mi lista de productos el producto encontrado
                products.pop(findProduct);
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

export default ProductManager