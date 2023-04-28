import style from "./SearchBar.module.css";
import { useState } from "react";
export default function SearchBar({onSearch}) {

   const [id, setId] = useState("");

   const handleChange = (event) => {
       setId(event.target.value) 
      // event.target.value = "";  //Esto para borrar el input. Pero en este proyecto no nos serviria porque estamos haciendo que "value" sea igual a ID, que si borramos el ID esto borrará el estado por lo tanto no mostraría nada.
   }

   return (
      <div className={style.container}>
         <input className={style.search} type='search' onChange={handleChange} value={id} />
         <button onClick={() => {onSearch(id); setId('')}}>Agregar</button>   
      </div>
   );
}
//"{onSearch(id); setId('')}" de esta manera resolvemos el problema anterior. Pasamos el ID y luego lo seteamos el input son un string vacio.
