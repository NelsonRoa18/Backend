import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
});

router.get('/profile', isAuthenticated, (req, res) => {
    if (req.session.user.rol != "admin") {
        res.render('profileUser', { user: req.session.user });
    }
    else {

        res.render('profileAdmin', { user: req.session.user });
    }

});

const secretKey = 'restore_pass';
// Ruta para mostrar el formulario de restablecimiento de contraseña
router.get('/restorepass', (req, res) => {
    const token = req.query.token;

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded) {
            res.render('restorepass', { token });
        }
        res.render('firstrestorepass');
    } catch (err) {
        res.status(401).send('El enlace ha expirado o no es válido.');
    }
});

router.get('/firstrestorepass', (req, res) => {
    res.render('firstrestorepass')
})

export default router;