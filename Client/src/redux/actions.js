import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";
import axios from 'axios';

export const addFav = (character) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';  
    return async (dispatch) => { 
        try{
            const { data } = await axios.post(endpoint, character)  

            if(!data.length) throw Error('No hay favoritos')
            
            return dispatch({  
                type: ADD_FAV,
                payload: data,
            });
        }catch(error){
            console.log(error.message);

        } 
    };

};

export const removeFav = (id) => {

    const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;  
    return async (dispatch) => {
        try{    
            const { data } = await axios.delete(endpoint)

            // if(!data.length) throw Error('No hay favoritos')

            return dispatch({
                type: REMOVE_FAV,
                payload: data,
            });

        }catch(error){
            console.log(error.message);
        }          
    };
}


/* ANTES:
export const addFav = (character) => {

    
    //ANTES:
    // return {type: ADD_FAV, payload: character}
    const endpoint = 'http://localhost:3001/rickandmorty/fav';  //URL de nuestro servidor.
    return (dispatch) => { //Retorno una funcion, donde esta funcion hace una peticion al servidor.
       axios.post(endpoint, character)  //Utilizamos el metodo "post", el primer parametro (endpoint) es la URL del server, y el segugundo (character) es un objeto que estaremos envindo por body (este es recibido mas arriba por parametro).
       .then(({ data }) => {  //Hacemos un destructuring de la respuesta de axios.
            return dispatch({  
                type: ADD_FAV,
                payload: data,
            });
       });
    };

};

export const removeFav = (id) => {
    //ANTES:
    // return {type: REMOVE_FAV, payload: id}
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;  //Le concatenemaos a esta URL el "id" que recibimos por parametro
    return (dispatch) => {
        axios.delete(endpoint) //"delete" retorna el array de favoritos pero filtrado.
        .then(({ data }) => {
            return dispatch({
                type: REMOVE_FAV,
                payload: data,
            });
        });
    };
}
*/

export const filterCards = (gender) => {
    return {type: FILTER, payload: gender}

}

export const orderCards = (order) => {
    return {type: ORDER, payload: order}
}