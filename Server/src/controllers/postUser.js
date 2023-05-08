const { User } = require('../DB_connection');

const postUser = async (req, res) => {

    const { email, password } = req.body;

    try{
        if(!email || !password || !email.trim() || !password.trim()){
            return res.status(400).send('Faltan Datos')
        } 
        const [ user, created ] = await User.findOrCreate({where: { email }, default:{ password }})
        return res.status(200).json({ user, created })

    }catch{
        return res.status(500).send(error.message)
    }
}

module.exports = postUser


