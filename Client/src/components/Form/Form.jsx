import { useState } from "react";
import validation from "../Validation/validation";

const Form = ({ login }) => {
    const [userData, setUserData] = useState({
        email: '',
        password:''
    });
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
        setErrors(validation({   //Aqui pasamos por parámetro la validacion para ver si cumple o no con ella.
            ...userData,
            [event.target.name]: event.target.value
        }))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();  
        login(userData);
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email"></label>   
            <input type="text" name="email" onChange={handleChange} value={userData.email} /> {/*Aquí "bindeamos" el input con el estado */} 
            {errors.email && <p style={{color: "green"}}>{errors.email}</p>}

            <label htmlFor="password"></label>
            <input type="text" name="password" onChange={handleChange} value={userData.password} />
            {errors.password && <p style={{color: "green"}}>{errors.password}</p>}

            <button>Submit</button>

        </form>
    )
}

export default Form;

//El "hatmlFor" debe ser igual al "name" del input.