import React from "react";
import Navbar from "../../components/Navbar/Navbar"
import style from "./Home.module.css";
import Cards from "../../components/Cards/Cards";
import FilterByTemperaments from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBreed, addTemperaments, setCurrentPage } from "../../redux/actions";
import Order from "../../components/Order/Order";


const Home = () => {
    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperament);
    const allDogs = useSelector((state) => state.dog); // Obtener todos los perros sin filtrar
    const [selectedTemperament, setSelectedTemperament] = useState("all");
    const [selectedCreated, setSelectedCreated] = useState("all");
    const [, setOrder] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    const currentPage = useSelector((state) => state.currentPage);
    const dogsPerPage = 8;
    const totalPages = Math.ceil(allDogs.length / dogsPerPage);
    // const totalPages = allDogs.length > 0 ? Math.ceil(allDogs.length / dogsPerPage) : 1;      

    useEffect(() => {
        dispatch(allBreed());
        dispatch(addTemperaments())
    }, [dispatch])

    // Filtrar los perros en función de los estados locales de temperamento y procedencia
    const filteredDogs = allDogs.filter((dog) => {
        const filterByTemperament = // variable booleana que almacena el resultado de la comparacion 
            selectedTemperament === "all" || //entre le temperamento seleccionado all o 
            dog.temperament?.includes(selectedTemperament); // si el temperamento del perro incluye el temperamento sleccionado si cualquiera de estas condiciones es verdadera filterByTemperament sera verdadero
        const filterByCreated =
            selectedCreated === "all" || // si se cumple esta condicion el filtro es exitoso
            (selectedCreated === "created" && dog.createdInDB) || // verifica si el perro fue creado en la DB
            (selectedCreated === "api" && !dog.createdInDB); // verifico si el perro viene de la API

        return filterByTemperament && filterByCreated; // si el perro cumple con estas condiciones ser agregado el filterdDogs
    });


    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
        setCurrentPage(1); // Reiniciar currentPage al hacer la búsqueda
    };

    const getPageDogs = () => {
        const startIndex = (currentPage - 1) * dogsPerPage;
        const endIndex = startIndex + dogsPerPage;
        console.log("Start Index:", startIndex);
        console.log("End Index:", endIndex);
        return filteredDogs.slice(startIndex, endIndex);
    };


    return (
        <div className={style.fondo}>
            <Navbar />
            <h1>Home</h1>
            <FilterByTemperaments
                temperament={temperament}
                selectedTemperament={selectedTemperament}
                setSelectedTemperament={setSelectedTemperament}
                selectedCreated={selectedCreated}
                setSelectedCreated={setSelectedCreated} />
            <Order setOrder={setOrder} />
            <Cards dogs={getPageDogs()} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
export default Home;