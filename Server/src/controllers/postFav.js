const { Favorite } = require('../DB_connection');

const postFav = async (req, res) => {

    const { name, origin, status, image, species, gender } = req.body;

    try{
        if(!name || !origin || !status || !image || !species || !gender){
            return res.status(401).send('Faltan datos')
        }

        const [ favorite, created ] = await User.findOrCreate({where: { name }, default:{ origin, status, image, species, gender }})

        const favorites = await Favorite.findAll()

        return res.status(200).json(favorites)
    
    }catch{
        return res.status(500).send(error.message)
    }
}

module.exports = postFav;
