import style from "./Card.module.css";
import { Link } from 'react-router-dom';
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";  //Para hacer un estado local.

function Card({id, name, species, gender, image, onClose, addFav, removeFav, myFavorites }) { //Sacamos el "status" y "origin" para no mostrar lo mismo que el "Detail.jsx".

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         removeFav(id)   //Este "removeFav()" es recibido por props.
      }
      else {
         setIsFav(true);
         addFav({id, name, species, gender, image, onClose});  //addFav esta esperando un "character" (un personaje) (revisar actions.js)Entonces, de esta manera pasamos un personaje (y no Card, porque Card es un componente). Y no pasamos props como argumento porque se pasarian todas las props (onClose, addFav, removeFav...)
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {  //Recorremos el estado global
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div className={style.card}>

         <div className={style.front} >
            <img src={image} alt={name} />
         </div>

         
         <div className={style.back} >
            <div>
               <Link to={`/detail/${id}`} className={style.link}>
                  <h2 className={style.name}>{name}</h2>
               </Link>
            </div>

            <div className={style.species} >
               <h2>Specie: {species}</h2>
               <h2>Gender: {gender}</h2>
               {/* <h2>{status}</h2>   Sacamos el "status" y "origin" para no mostrar lo mismo que el "Detail.jsx"
               <h2>{origin}</h2> */}
            </div>

            <div className={style.btn}>
               <button onClick={() => onClose(id)}>X</button>
            </div>

            {  /* Aqui estamos haciendo la condicional ternaria "isFav ? () : ()"  
         UNA OPCION MAS CORTA DE ESTO ES:
         <button onClick={handleFavorite}>{isFav ? '❤️' : '🤍' }</button>
         */
            isFav ? (    
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }

         </div>
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => { dispatch(addFav(character)) },   //Lo que vamos a despachar es un objeto. Character es {id, name, species, gender, image}.
      removeFav: (id) => { dispatch(removeFav(id)) }  //El primer "removeFav" me llego por props, y el segundo que despachamos es el que importamos de "actions.js". Luego le pasamos al primer "removeFav" el "id" por parametro ya que al id de más arriba le pasamos un "id" por parametro, entonces debemos hacer lo mismo con este. Y por ende, le pasamos el "id" por parametro al segundo "removeFav" (al que despacharemos). Y cuando se despacha ese ID se lo recibe en el ID de la constante "removeFav" del archivo "actions.js". 
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);

//"<button onClick={onClose(id)}>X</button>" no puedo hacer esto, ya que de esta manera no modifico el estado. Para modificar efectivamente el estado debo hacer un llamado a callback "() => (onClose(id))".

//"<Link to='/detail/:id' >" de esta manera no funciona, debo usar template string (``) y a esto sumarle las {} porque estas comillas invertidas son códigos de JS.

