//Antes:
// const express = require('express');
// const server = express();
const { conn } = require('./DB_connection');  // Esta es la configuracion de nuestra Base de Datos
const server = require('./app');  //Esta es la configuracion de nuestro servidor.
const PORT = 3001;

server.listen(PORT, async () => {
   await conn.sync({ force: true })   //Con la funcion ".sync()" nos ayuda a levantar la base de datos y a la vez crea sus tablas.
   console.log(`Server raised in port: ${PORT}`);
});

