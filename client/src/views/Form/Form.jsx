import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createBreed , addTemperaments } from "../../redux/actions";


const validation = (input) =>{
    const error = {};
     //Validacion nombre
    if(!input.name){
        error.name = "Se necesita un nombre "
    }else if(input.name.length < 2){
        error.name = "El nombre debe tener al menos 2 caracteres"
    }else if(!isNaN(input.name)){
        error.name ="El nombre no puede ser un numero"
    }
    // Validacion altura
    if(!input.height){
        error.height = "Se necesita una altura"
    }else if(input.height.length < 1){
        error.height = "La altura no puede ser menor a 1"
    }else if(isNaN(input.height)){
        error.height = "La altura debe ser un numero"
    }else if(input.height < 0){
        error.height = "La altura no puede ser un numero negativo"
    }
    
    // Validacion de peso
    if(!input.weight){
        error.weight ="Se necesita un peso"
    }else if(input.weight.length < 1){
        error.weight ="El peso no puede ser menor que 1"
    }else if(isNaN(input.weight)){
        error.weight ="El peso debe ser un numero"
    }else if(input.weight < 0 ){
        error.weight = "La altura no puede ser un numero negativo"
    }
    //Validacion de life_span
    if(!input.life_span){
        error.life_span = "Se necesita un life_span"
    }else if(input.life_span.length < 1){
        error.life_span ="El life_span debe ser mayor a 1"
    }else if(isNaN(input.life_span)){
        error.life_span = "El life_span debe ser un numero"
    }else if(input.life_span < 0 ){
        error.life_span = "El life_span no puede ser un numero negativo"
    }
    return error;
}

const Form = () => {
    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperament);
    const dogsInDatabase = useSelector((state) => state.dogFilter)
    // console.log("temperament from Redux:", temperament);
    const [temperamentDB, setTemperamentDB] = useState([]);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        weight: "",
        height: "",
        image: "",
        life_span: "",
        temperament: [],
    })

    useEffect(() => {
        dispatch(addTemperaments());
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const dogExistsInDatabase = dogsInDatabase.some((dogFilter) => dogFilter.name.toLowerCase() === input.name.toLowerCase());
        if (dogExistsInDatabase) {
            alert("¡Este perro ya existe en la base de datos!");
        } else if (!input.name && !input.weight && !input.height && !Object.keys(errors).length) {
            alert("Completar formulario");

        } else if (!errors.name && !errors.weight && !errors.height && !errors.image && !errors.life_span) {
            const newDog = { 
                ...input, 
                name: input.name.trim(), 
                image: input.image.trim(), 
                temperament: temperamentDB,   
               };
            dispatch(createBreed(newDog));
            alert("Se creo correctamente la nueva raza");

            setInput({
                name: "",
                weight: "",
                height: "",
                image: "",
                life_span: "",
                temperament: [],
            });
            setTemperamentDB([]);
        } else {
            alert("Completar el formulario");
        }
        document.querySelector('select[name="form-temperaments"]').selectedIndex = 0; // seleciona el elemento de la lista y establece su indice en cero
    };
    const handleChange = (e) => {// accedo a la propiedad del objeto  nuevo valor
        if(e.target.name === "weight"){
            if(e.target.value < 0){
                setInput({ ...input, [e.target.name]: 0 });
            }else{

                setInput({ ...input, [e.target.name]: e.target.value });
            }
        }
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors(validation({ ...input, [e.target.name]: e.target.value }));
    };                  

    const handleSelect = (e) => {
        if (!temperamentDB.includes(e.target.value))
            setTemperamentDB([...temperamentDB, e.target.value]);
    };

      
    return (
        <div className={style.fondo}>
            <Navbar />
            <h1>Form</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label >
                        Name <span>*</span>
                    </label>
                </div>
                <input
                    name="name"
                    value={input.name}
                    placeholder="Breed name"
                    onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
                <div >
                    <div>
                        <label >
                            Height <span>*</span>
                        </label>
                        <div>
                            <input
                                name="height"
                                value={input.height}
                                placeholder="cm"
                                onChange={handleChange}
                                type="string"
                            />
                            {errors.height && (<p>{errors.height}</p>)}
                        </div>
                    </div>
                </div>
                <div >
                    <div >
                        <label >
                            Weight <span>*</span>
                        </label>
                        <div>
                            <input
                                name="weight"
                                value={input.weight}
                                placeholder="kg"
                                onChange={handleChange}
                                type="number"
                            />
                            {errors.weight && (<p>{errors.weight}</p>)}
                        </div>
                    </div>
                </div>
                <div >
                    <div>
                        <label>Life span</label>
                        <div>
                            <input
                                name="life_span"
                                value={input.life_span}
                                placeholder="year"
                                onChange={handleChange}
                                type="number"
                            />
                            {errors.life_span && (<p>{errors.life_span}</p>)}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Image</label>
                    </div>
                    <input
                        name="image"
                        value={input.image}
                        placeholder="Image URL"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div>
                        <label>Temperaments</label>
                    </div>             
                    <select
                        defaultValue="DEFAULT"
                        name="form-temperaments"
                        onChange={handleSelect}
                    >
                        <option value="DEFAULT" disabled>
                            Select temperaments...
                        </option>
                        {temperament.map((temp) => (
                            <option
                                key={temp.name}
                                value={temp.name}
                            >
                                {temp.name}
                            </option>
                        ))}
                    </select>
                    <ul>
                        {temperamentDB.map((temperament, id) => (
                            <li key={id}>
                                {temperament}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button type="submit">
                        Create dog
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Form;