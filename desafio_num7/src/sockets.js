import { Server } from "socket.io";

import ProductManager from './dao/class/ProductManager.js'
import MessageManager from './dao/class/ChatManager.js'
import CartManager from './dao/class/CartManager.js'


const productManager = new ProductManager()
const messageManager = new MessageManager()
const cartManager = new CartManager()

export default function initializeSocket(httpServer){

    const socketServer = new Server(httpServer)

    console.log("dentro de initialize");
    let idProductToUpdate = ""

    socketServer.on('conection', socket => {
        console.log("nuevo cliente conectado");
    })

}