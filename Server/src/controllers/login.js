const users = require('../utils/users')

const login = (req, res) => {
    const { email, password } = req.query  //Recibo estos datos (email, password) a través de query(este es un objeto)

    const userFound = users.find((user) => user.email === email && user.password === password) //Aqui evaluamos si hay un usuario (en el array de objetos "users") que cumpla esta condicion.

    return userFound
    ? res.status(200).json({ access: true })
    : res.status(404).json({ access: false })

    /*OTRA OPCION PARA LO DE ARRIBA:
    if(userFound) return res.status(200).json({ access: true })
    return res.status(404).json({ access: false })   //Esto funciona como un "else".
    */
}

module.exports = {
    login
}