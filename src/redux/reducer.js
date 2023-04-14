import { ADD_FAV, REMOVE_FAV } from "./action-types";

const initialState = {
    myFavorites: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.myFavorites, action.payload]   //Tenemos toda una copia de "state" (con "...state") y le concatenamos a "action.payload" (y aqui no hacemos un spread operator de "action.payload" porque es un objeto de un "character", no de "characters").
            }

        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: state.myFavorites.filter(fav => fav.id !== action.payload)
            }   //myFavorite es un array. Lo recorremos y decimos que nos quedamo con todos los personajes favoritos (fav) que su ID sea distinto al ID que me mandan por "action.payload".


        default:
            return{...state}
    }

}

export default reducer;

