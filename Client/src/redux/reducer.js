import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";

const initialState = {
    myFavorites: [],
    allCharactersFav: []   //"alCharactersFav" sería una copia de "myFavorites" para no pisar el array original, y para que este array original mantenga como una copia de seguridad.
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                allCharactersFav: action.payload

                //ANTES:
                // myFavorites: [...state.allCharactersFav, action.payload],   //En este caso ambos estados son iguales.
                // allCharactersFav: [...state.allCharactersFav, action.payload]  //Uno será el original y el otro sera el que estaremos filtrando y modificando. Por ende, estariamos trabajando con una copia del original.    

                //"myFavorites: [...state.myFavorites, action.payload]"Tenemos toda una copia de "state" (con "...state") y le concatenamos a "action.payload" (y aqui no hacemos un spread operator de "action.payload" porque es un objeto de un "character", no de "characters").
            }

        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                allCharactersFav: action.payload
                //ANTES:
                // myFavorites: state.myFavorites.filter(fav => fav.id !== action.payload)
            }   //myFavorite es un array. Lo recorremos y decimos que nos quedamo con todos los personajes favoritos (fav) que su ID sea distinto al ID que me mandan por "action.payload".
        case FILTER:
            //Lo hacemos en una constante solo por comidad para trabajar.   
            const charactersFiltered = state.allCharactersFav.filter(character => character.gender === action.payload)
            return {
                ...state,
                myFavorites:
                    action.payload === 'allCharacters'
                    ? [...state.allCharactersFav]
                    : charactersFiltered
            }    
        case ORDER:
            const allCharactersCopy = [...state.allCharactersFav]
            return {
                ...state,
                myFavorites:
                    //Ordenamos de menor a mayor con el primero y con el segundo de menor a mayor:
                    action.payload === 'A' ? allCharactersCopy.sort((a, b) => a.id - b.id ) : allCharactersCopy.sort((a, b) => b.id - a.id)  //"a" y "b" representan los dos indices del array. El simbolo "-" (menos), funciona igual a " "
            }


        default:
            return{...state}
    }

}

export default reducer;

