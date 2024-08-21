
import supertest from "supertest";
import { expect } from "chai";


const requester = supertest('http://localhost:8080')

describe('Testing Ecommerce', () => {
    describe('Test de productos', () => {

        it('El enpoint get /products/addproducts debe crear un producto correctamente', async () => {
            const productsMock = {
                name: "Galletitas criollitas",
                description: "Galletas de mesa",
                price: 451,
                category: "Galletitas",
                available: true,
                owner: "666b8287747b4fe992b5cdb9"
            }
            const {
                statusCode,
                ok,
                _body
            } = await requester.get('/products/addproducts').send(productsMock)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
            expect(_body.payload).to.have.property('_id')
        })

        it('Intentar crear una producto sin el campo nombre debe responder con un status 400', async () => {
            const productsMock = {
                description: "Galletas de mesa",
                price: 451,
                category: "Galletitas",
                available: true,
                owner: "666b8287747b4fe992b5cdb9"
            }
            const { statusCode, ok, _body } = await requester.post('/products/addproducts').send(productsMock)

            expect(statusCode).to.equal(400)
        })

        it('Al obtener un producto con el metodo GET, la respuesta debe tener status, payload, y debe ser un arreglo', async () => {
            const { statusCode, ok, _body } = await requester.get('/products')

            expect(statusCode).to.equal(200)
            expect(_body).to.have.property('payload')
            expect(_body.payload).to.be.an('array')
        })

        it('Me metodo PUT debe poder actualizad correctamente un producto determinado', async () => {
            const productUpdate = {
                name: "Caramelos acidos",
                description: "Caramelos que te arrugan la cara",
                price: 451,
                category: "Caramelos",
                available: true,
                owner: "666b8287747b4fe992b5cdb9"
            }

            //Obtener un Id del producto existentes
            const idProducto = '66b2b0ca4214022f6a300b91'



            const { statusCode, ok, _body } = await requester.put(`/products/update`).send({idProducto})

            //Verificacion que la actualizacion se haya realizado correctamente 

            expect(statusCode).to.equal(200)
            expect(updatedProduct.name).to.equal("Caramelos Acidos");
        })

    })
    describe('Test de usuarios', () => {
/*         it('El enpoint POST /api/sessions/register debe crear un usuario correctamente', async () => {
            const userMock = {
                first_name: "Pedro",
                last_name: "Pompim",
                email: "pedro@mail.com",
                age: 45,
                password: "123456",
                cart: [],
                rol: "user"
            }
            const {
                statusCode,
                ok,
                _body
            } = await requester.post('/api/sessions/register').send(userMock)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
            expect(_body.payload).to.have.property('_id')
        }) */

        it('El enpoint POST /api/sessions/login debe iniciar a un usuario correctamente', async () => {
            const userMock = {
                email: "pedro@mail.com",
                password: "123456",
            }
            const {
                statusCode,
                ok,
                _body
            } = await requester.post('/api/sessions/login').send(userMock)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
            //expect(_body.payload).to.have.property('_id')
        })
    })
})



/* 
to.have.property
to.equal(400)
to.be.an('array)
to.be.undefined // corroborar que la msacota ya no exista al realizar un GET
*/