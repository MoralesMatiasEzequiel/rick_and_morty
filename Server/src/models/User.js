const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {
      id:{
         type: DataTypes.INTEGER(),  //Aqui podemos poner tambien: "type: DataType.UUID" esto nos va a permitir ingresar un combinado de letras y numero como por ej "afasff466-asd564-asd8799" (esto seria un hash).
         //defaultValue: DataTypes.UUIDV4(), //Esto permite que si no le pasamos un ID complejo éste lo va a crear.
         primaryKey: true,
         allowNull: false
      },
      email:{
         type: DataTypes.STRING(),
         allowNull: false,
         isEmail: true  
         /*
         validate:{
            isEmail: true // REGEX. Aqui podemos poner una REGEX para hacer una validacion mas compleja 
         }

         */
      },
      password:{
         type: DataTypes.STRING(),
         allowNull: false
         /*
         validate:{
            is: //Y aqui poner una REGEX.
         }
         */
      }
   }, { timestamps: false });
};
