let myFavorites = [];

const postFav = (req, res) => {
    try{  //Intenta resolver todo esto. Sino entrá al catcha()
        const character = req.body; //Aqui me traigo todo el personaje del body.
        const characterFound = myFavorites.find(fav => fav.id === character.id);  //Creo una constante para buscar un personaje repetido en el array "myFavorites".

        if(characterFound) throw Error ('Este personaje ya existe en favoritos'); //Si encontre algo lanzo un error reportando tal mensaje. En caso de que eso suceda entramos al catch().
        //Caso contrario entramos aqui:
        myFavorites.push(character)  //Pusheamos el personaje en el array.

        return res.status(200).json(myFavorites); //Se retorna una respuesta de 200 junto al array de favoritos.
    }catch(error){
        return res.status(404).send(error.message);

    }   
};

const deleteFav = (req, res) => {
    const { id } = req.params;

    myFavorites = myFavorites.filter((favorite) => favorite.id !== +id) //REcorremos el array de favoritos, y nos quedamos con todos los favoritos que su id sean distinto al id que recibimos por "params". Con "+id" estamos parseando de nro a string.

    return res.status(200).json(myFavorites);
}

module.exports = {
    postFav,
    deleteFav
}