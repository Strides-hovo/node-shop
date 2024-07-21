const { Router } = require('express')
const router = Router();
const { UserController } = require('../controllers/UserController')
const { corsMiddleware } = require('../middlewares/cors');

router.post('/register', corsMiddleware, UserController.register)
router.post('/login', UserController.login);
router.delete('/logout', UserController.logout)
router.get('/user/:id', UserController.getUser)

module.exports = router
