import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.render('products', {user: req.session})
})


export default router;