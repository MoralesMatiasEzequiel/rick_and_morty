import style from "./Detail.module.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character' 
const API_KEY = '43b95022c007.58872b4fbbbc997f4094';

const Detail = () => {
    const { id } = useParams(); //"useParams()" nos devuelve un objeto gigante, aquí nos interesa "id" por eso hacemos destructuring.
    const [character, setCharacter] = useState({});
    
    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {  
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});  
     }, [id]);   //IMPORTANTE: NO olvidarse del array de dependencia.
    
    return (
        <div className={style.container} >

            <div>
              <div>
                <button>
                    <Link to='/home' className={style.link} >Home</Link>
                </button>
                <h1>{character?.name}</h1>
              </div>

              <div className={style.detail} >
                <div className={style.containerImg} >
                  <img src={character?.image} alt={character?.name} />
                </div>

                <div>
                  <label htmlFor="status">Status: </label>
                  <p>{character?.status}</p>
                  <label htmlFor="specie">Specie: </label>
                  <p>{character?.species}</p>
                  <label htmlFor="gender">Gender: </label>
                  <p>{character?.gender}</p>
                  <label htmlFor="origin">Origin: </label>
                  <p>{character?.origin?.name}</p>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Detail;

/*Antes:
<div className={style.container} >
            <h2>{character?.name}</h2>
            <h2>{character?.status}</h2>
            <h2>{character?.species}</h2>
            <h2>{character?.gender}</h2>
            <h2>{character?.origin?.name}</h2>
            <img src={character?.image} alt={character?.name} />
        </div>
*/