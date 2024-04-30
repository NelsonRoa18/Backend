import express from 'express'

const router = express.Router()

import { promises as fs } from 'fs';

const file = './data/productos.json'


router.get("/", async (req, res) => {
    try {

        res.render('home', {})

    } catch (error) {
        console.error('Error:', error);
    }

})


export default router
