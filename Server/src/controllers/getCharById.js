const URL = "https://rickandmortyapi.com/api/character"
const axios = require('axios')

const getCharById = async (req,res) => {
    try{
        const { id } = req.params;
        const { data } = await axios(`${URL}/${id}`)

        if(!data.name) throw new Error(`ID: ${id} Not found`)
        
        const character = {
            id: data.id,
            name: data.name,
            species: data.species,
            origin: data.origin,
            image: data.image,
            gender: data.gender,
            status: data.status
        }
        return res.status(200).json(character)        
    }
    catch (error){
       return error.message.includes('ID')  //Aqui preguntamos si el mensaje del error incluye "ID" (como lo especificamos arriba)
       ? res.status(404).send(error.message)
       : res.status(500).send(error.response.data.error)

    }
}

//ANTES:

// const getCharById = (req, res) => {
//     const { id } = req.params

//     axios(`${URL}/${id}`)
//     .then(response => response.data)
//     .then(({status, name, species, origin, image, gender}) => {
//         if(name){
//             const character = {
//                 id,
//                 name,
//                 species,
//                 origin,
//                 image,
//                 gender,
//                 status
//             }
//             return res.status(200).json(character)
//         }
//         return res.status(404).send('Not found');
//     })
//     //REVISAR ESTO:
//     // .catch(error = res.status(500).send(error.message))
//     .catch(error => {  //Si pongo {} usar return, porque sino se rompe.
//         return res.writeHead(500, {"content-type": "text/plain"}).end(error.message)
//     })
    
// }

module.exports = getCharById;

/* ANTES:
const axios = require('axios');

const getCharById = (res, id) =>{
    axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.data)                            //"response" no es igual a "res", son distintos. "response" es la respuesta que obtenemos de la api.
    .then(({name, gender, species, origin, image, status}) => {
        const character = {
            id,
            name,
            gender,
            species,
            origin,
            image,
            status
        }
        return res.writeHead(200, {"content-type": "application/json"}).end(JSON.stringify(character))
    })
    .catch(error => {  //Si pongo {} usar return, porque sino se rompe.
        return res.writeHead(500, {"content-type": "text/plain"}).end(error.message)
    })
}

module.exports = {
    getCharById

}
*/