require('dotenv').config();  //No se crea una variable, sino directamente se requiere (aqui requerimos su configuracion ".config()"). De esta manera se nos brinda un archivo de tipo "process" que es un objeto grande y que dentro de el está el objeto "env" ({ {env:} }) y dentro de el se guardara todo lo que alojemos en el archivo ".env" (DB_USER, DB_PASSWORD, DB_HOST).
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;  //Por lo descripto anteriormente es que podemos hacer este Destructuring.
const FavoriteModel = require('./models/Favorite'); //Aqui importamos los modelos.
const UserModel = require('./models/User'); 

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(  //Aqui llamamos a Sequelize
   // URL
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,  //De esta manera ya tenemos conectada nuestra Base de Datos.
   { logging: false, native: false }
);

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
FavoriteModel(sequelize);
UserModel(sequelize);
//

//

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite } = sequelize.models;
User.belongsToMany(Favorite, { through: 'UserFavorite' });
Favorite.belongsToMany(User, { through: 'UserFavorite' });

module.exports = {
   // User,
   // Favorite,
   ...sequelize.models,  //De esta manera exportamos todo lo que se encuentre alojado dentro de models
   conn: sequelize,
};
