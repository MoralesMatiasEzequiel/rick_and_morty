import style from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ onSearch, setAccess }) => {
    //Esta es la opcion ideal para hacer un LOG OUT: porque trabajamos con el estado. Lo podemos setear.
    const handleLogOut = () => {
        setAccess(false);
    }

    return(
        <nav className={style.nav}>
        
            <div className={style.btns}>
                <Link to='/about' >ABOUT</Link>
                <Link to='/home' >HOME</Link>
                <Link to='/favorites' > Favorites </Link>
                
                {/* OTRA OPCION:
                <button className={style.btns}>
                    <Link to='/about' >ABOUT</Link>   
                </button>
                <button className={style.btns}>
                    <Link to='/home' >HOME</Link>
                </button>
                <button onClick={handleLogOut} >Log Out</button> */}
            </div>

            <button onClick={handleLogOut}>LOG OUT</button> 
            {/*<Link to='/'>LOG OUT</Link>  Esta es otra opcion para hacer un LOG OUT. "Link" tambien puede funcionar como un botón. */}
            <SearchBar onSearch={onSearch}/>
            
        </nav>
    )

}

//"<link>", luego de hacer click en el boton, nos lleva a la ruta que ya definimos en App (con <Route>)

export default Nav;

