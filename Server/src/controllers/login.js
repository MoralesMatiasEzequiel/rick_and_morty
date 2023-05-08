const { User } = require('../DB_connection');

const login = async (req, res) => {
    const { email, password } = req.query

    try{
        if(!email || !password){
            return res.status(400).send('Faltan Datos')
        }
        const user = await User.findOne({
            where: { email }, default:{ password }})

        if(!user){
            return res.status(404).send('Usuario no encontrado')
        }
        if(user.password !== password){
            return res.status(403).send('Contraseña incorrecta')
        }
        return res.status(200).json({access: true})
        
    }catch{
       return res.status(500).send(error.message)
    }
}

module.exports = login;
