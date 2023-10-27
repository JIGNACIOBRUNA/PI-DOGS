import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTemperaments, filterOrigin, setCurrentPage } from "../../redux/actions";
import style from "./Filter.module.css";


const FilterByTemperaments = () =>{
    const temperaments = useSelector(state => state.temperament)
    const dispatch = useDispatch();

    const filterByTemperament = (e) => {
        dispatch(filterTemperaments(e.target.value))
        dispatch(setCurrentPage(1));
    };

    const filterByCreated = (e) => {
        dispatch(filterOrigin(e.target.value))
        dispatch(setCurrentPage(1));
    };

    return(
        <div className={style.filter}>
            <select className={style.filters} name="Temperaments" onChange={filterByTemperament} id="">
                <option value="Default" disabled>Temperaments</option>
                <option key={0} value="all">All Temperaments</option>
                {temperaments.length ? (
                    temperaments.map((tem) => (
                        <option key={tem.id} id={tem.name}>
                            {tem.name}
                        </option>
                    ))
                ) : null}
            </select>
            {/* Filtro por procedencia */}
            <select className={style.filters} name="Created" onChange={filterByCreated} id="">
                <option value="all">All Dogs</option>
                <option value="created">Created in DB</option>
                <option value="api">API</option>
            </select>
        </div>
    )
}


export default FilterByTemperaments;