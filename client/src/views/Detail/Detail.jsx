import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { detailDog } from "../../redux/actions";

const formatMeasurement = (measurement) => {
    if (typeof measurement === "object") {
        return measurement.metric;
      } else if (typeof measurement === "number" || typeof measurement === "string") {
        console.log("si viene de la base de datos", measurement);
        return measurement;
      } else {
        return "Unknown";
      }
    };


const Detail = ()=>{
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail);
    const {id} = useParams();

    const formatImage = (image) => {
        if (typeof image === "object") {
          return image.url;
        } else {
          return image;
        }
      };

    useEffect(()=>{
        dispatch(detailDog(id));
        // console.log(id);
    },[id, dispatch])//indica a react que vuelva a ejecutar useEffect si uni de estos valores cambia 

    if (detail.length === 0) { // verifico si el detalle tiene datos antes de renderizar 
        return <div>Cargando...</div>;
    }

    const dogDetail = detail[0]; // extraigo el primer elemento del array detail y lo asigno 
    return(
        <div className={style.fondo } key={id}>
            <Navbar />
                <h1>Detail</h1>
            <div className={style.contenedor}> 
                <h2>Id: {dogDetail.id}</h2> 
                <img src={formatImage(dogDetail.image)} alt ="" className={style.image}/> 
                <h2>Name: {dogDetail.name}</h2>
                <h2>Height: {formatMeasurement(dogDetail.height)}</h2>
                <h2>Weight: {formatMeasurement(dogDetail.weight)}</h2>
                {/* dogs created in db */} 
                <h2> Temperament:
                {Array.isArray(dogDetail.temperaments) && dogDetail.temperaments.length
                ? (
                <ul>{dogDetail.temperaments.map((temperament, index) =>(
                    <p key={index}>{temperament.name}</p>
                ))}</ul>
                )
                : null}
                {/* dogs api */}
                {typeof dogDetail.temperament === 'string' && dogDetail.temperament.length
                ? <p>{dogDetail.temperament.length ? `${dogDetail.temperament}.` : null}</p>
                : null} </h2>
                {/* <h2>Temperaments: {dogDetail.temperament}</h2> */}
                <h2>Life_Span: {dogDetail.life_span}</h2>
            </div>
        </div>
    )
}
export default Detail;