const validation = (userData) => {
    const errors = {};

    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)){ 
        errors.email = "El email ingresado es inválido"
    }
    if(!userData.email){
        errors.email = "Ingrese un email"
    }
    if(userData.length > 35){
        errors.email = 'El email ingresado no debe superar los 35 caracteres'
    }

    if(!/.*\d+.*/.test(userData.password)){
        errors.password = 'La contraseña debe contener al menos un número'
    }
    if(userData.password.length < 6 || userData.password.length > 10){  //Aquí podemos tambien usar una REGEX que represente esta condicion.
        errors.password = 'La contraseña debe tener un tamaño entre 6 y 10 caracteres' 
    }

    return errors;

}

export default validation;


/* La REGEX "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i" está evaluando:
Que puede haber letras de la A a la Z, nros de0 al 9, puede haber estos simbolos ".%+-", luego seguido
de esto debe haber una @, luego letras de la A a la Z, numeros del 0 al 9, simbolos ".-", a esto se le 
concatena otro ".", mas letras y/o numeros.

La REGEX "/.*\d+.* /" (sin el espacio que hay aqui "* /") está validando:
Si hay un numero.
*/