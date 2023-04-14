import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { useState, useEffect } from 'react';
import axios from 'axios';  //AXIOS es una libreria que nos permite hacer peticiones a una API.
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character'   //Lo llamamos "url base" porque esta parte de url no se modifica.
const API_KEY = '43b95022c007.58872b4fbbbc997f4094';

const email = 'mat@gmail.com'
const password = '123mati'

function App() {
   const location = useLocation();  //Nos devuelve un objeto, lo que no interesa de el es la propiedad "pathname" porque nos dice en qué ruta está posicionado el usuario.
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([])
   const [access, setAccess] = useState(false)

   const login = (userData) => {
      if(userData.email === email && userData.password === password){
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access])   //Aqui indicamos lo siguiente: estar dependiente de "access" (a traves del array de dependencia "[access]") que inicialmente está en false. Si access esta en false no me va a llevar a otra ruta que no sea "/". Si da true no se ejecuta la condicion.

   const onSearch = (id) => {    //Este "id" sería lo que escribe el usuario. 
         axios(`${URL_BASE}/${id}?key=${API_KEY}`).then(({ data }) => {
         //axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {   //Todo esto es similar a lo que haciamos con AJAX. Aqui le pasamos entre () la url del servidor. El ".then()" recibe la respuesta de la API. Es similar al "$.get()=>{}". Esto es PROMESAS. Con "{ data }" estamos haciendo destructuring, porque me quedo con "data" de todo el objeto gigante que devuelve axios.
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => {
      const charactersFiltered = characters.filter(characters =>  //Utilizamos el método ".filter()" para filtrar el array "characters". Y digo, si el personaje ("characters.id") es distinto al personaje que me pasan por parametro ("id") quedate con ese personaje, sino no. Aqui tenemos una cuestión, y es que el ID que se pasará por parametro será un string y no un número como el "characters.id", por lo tanto hay que convertir el string a número, y a esto se lo puede hacer con parseInt() o Number(). 
         characters.id !== Number(id))
         setCharacters(charactersFiltered);  //Aquí seteamos el resultado en el estado local "characters".
   }


   return (
      <div className='App'>
         {location.pathname !== '/' && <Nav onSearch={onSearch} setAccess={setAccess}/>} {/* Otra opción: {location.pathname !== '/' ? <Nav onSearch={onSearch}/> : null}*/}
           
         
         <Routes>
            <Route path='/' element={<Form login={login}/>} />
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
            <Route path='/about' element={<About />} />
            <Route path= '/detail/:id' element={<Detail />} />
            <Route path='/favorites' element={<Favorites />} />
         </Routes> 
         
         
      </div>
   );
   //"<Nav ... />" de esta manera (arriba de todo) estará en todas las rutas que creamos.
}

export default App;

//{location.pathname !== '/' ? <Nav onSearch={onSearch}/> : null}

   // const example = {
   //    id: 1,
   //    name: 'Rick Sanchez',
   //    status: 'Alive',
   //    species: 'Human',
   //    gender: 'Male',
   //    origin: {
   //       name: 'Earth (C-137)',
   //       url: 'https://rickandmortyapi.com/api/location/1',
   //    },
   //    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
   // };

   // const onSearch = () => {
   //    setCharacters([...characters, example])  //No puedo hacer un "characters.push()" porque me lo tomaría como un array normal. Y esto no es un array sino un ESTADO, por lo tanto para modificarlo debo usar la funcion que setea el estado, y para agregar algo al array debo concatenarlo luego de hacer una copia de lo que ya tenia (a traves del "spread operator": "...").
   // }
