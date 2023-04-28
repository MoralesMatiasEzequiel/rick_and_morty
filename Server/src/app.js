const express = require('express');
const server = express();
const router = require('./routes/index')
const morgan = require('morgan')

//Estos son MIDDLEWARE:

server.use(express.json());  //Este middleware me convierte la informacion que me llega en formato JSON a objeto de JS.
server.use(morgan('dev'));

server.use((req, res, next) => {  //Este middleware es un CORS: le da acceso al front-end para que pueda acceder a nuestras rutas.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
 });

server.use('/rickandmorty', router);  //Este middleware agregará un string '/rickandmorty'antes de cada una las rutas.

module.exports = server;


//Cuando esto estaba en "index.js":
/* ANTES:
const http = require ('http');
// const data = require('./utils/data');
const { getCharById } = require ('./controllers/getCharById')

http
.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  //Esta linea le da permiso al Front-end para que pueda hacer peticiones. (No siempre se codea así para conseguir esto)

    if(req.url.includes('/rickandmorty/character')){
        const id = req.url.split('/').at(-1)

        getCharById(res,+id);
    }

}).listen(3001,'localhost');
*/

/* MÁS ANTES:
http
.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  //Esta linea le da permiso al Front-end para que pueda hacer peticiones. (No siempre se codea así para conseguir esto)

    if(req.url.includes('/rickandmorty/character')){  //Con el metodo ".includes()" preguntamos si en la url se incluye a "/rickandmorty/character", esta es otra opcion al "req.url === '../.. etc'".
        const id = req.url.split('/').at(-1);  //Con ".at(-1)" nos quedamos con el elemento de la ultima posicion.
        
        const characterFound = data.find((character) => character.id === +id) //Utilizando "+" delante de una variable de tipo string, lo parseamos a numero.

        return res.writeHead(200,{"content-type":"application/json"}).end(JSON.stringify(characterFound))
                 
        
    }

*/