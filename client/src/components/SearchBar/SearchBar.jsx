import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNameDog, setCurrentPage } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () =>{
    const dispatch = useDispatch();
    const [dog, setDog] = useState("");
    

    const handleChangeName = (e) => {
        e.preventDefault() //prevenimos el comportamiento por defecto de este evento
        setDog(e.target.value);
        // console.log('console.log1', e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameDog(dog));
        dispatch(setCurrentPage(1));// con este dispatch actualizo la pagina actual a la primera 
        setDog('');
    
    }

    return(
        <div className={style.contenedor}>
            <input className={style.search} type="text" placeholder="Search" value={dog} onChange={e => handleChangeName(e)} ></input>
            <button className={style.button} type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar;