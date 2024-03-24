class ProductManager {

    constructor() {
        this.products = []
    }


    //Terminar el add product

    addProduct(title, description, price, thumbnail, stock) {
        //Esto es para generar en id del producto auto generable en crecimiento
        const product_id = this.products.length + 1;
        //Esta constante es para conseguir los id ya colocados en los productos y compararlos con el id autogenerable
        //.find(lo que buscamos) en este caso dentro de los parentesis del find se coloca la especificidad de la busqueda
        // 
        const findProduct = this.products.find((product) => product.code === product_id)

        if (!findProduct) {
            const prod = {
                code: product_id,
                title,
                description,
                price,
                thumbnail,
                stock
            }
            this.products.push(prod)
        }else{
            console.log("Producto ya creado")
        }
    }

    getProducts() {
        //Devuelve el arreglo con todos los elementos del array
        return this.products;
    }

    getProductsById(product_id) {
        const findProduct = this.products.find((product) => product.code === product_id)

        if (!findProduct) {
            console.log("Not found")
            return
        }

        return findProduct;

    }
}

const productManager = new ProductManager()

//Agregar productos

productManager.addProduct("Jamon", "Fiambre de cerdo", 54, "saraza", 21);
// productManager.addProduct("Jamon", "Fiambre de cerdo", 54, "saraza", 22);
// productManager.addProduct("Jamon", "Fiambre de cerdo", 54, "saraza", 23);
// productManager.addProduct("Jamon", "Fiambre de cerdo", 54, "saraza", 24);
// productManager.addProduct("Jamon", "Fiambre de cerdo", 54, "saraza", 25);

let id = 1;
const listProducts = productManager.getProducts();
const findProduct = productManager.getProductsById(id);

//console.log(listProducts);
console.log(findProduct);