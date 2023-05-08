const { getCharById } = require('../controllers/getCharById');
const login = require('../controllers/login');
const postFav = require('../controllers/postFav');
const deleteFav = require('../controllers/deleteFav')
const router = require('express').Router()  //Aqui lo que queremos de "express" es solo el Router.

router.get('/character/:id', (req, res) => {
    getCharById(req, res);
})

router.get('/login', (req, res) => {  
    login(req, res);
})

router.post('/login', (req, res) => {  
    login(req, res);
})

router.post('/fav', (req, res) => {
    postFav(req, res);
})

router.delete('/fav/:id', (req, res) => {
    deleteFav(req, res);
})  

/*OTRA OPCION: Para el ruteo
router.get('/login', login)
De esta manera al pasar la funcion "login" por parametro, luego de la ruta, le estoy pasando de manera automatica a 'req' y a 'res'. Ya qe estos son parametros de la funcion de "login".

*/


module.exports = router;