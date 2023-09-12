const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



router.post('/new', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    validarCampos
], createUser )

router.post('/', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    validarCampos
], loginUser )

router.get('/renew', validarJWT, revalidateToken )

module.exports = router;