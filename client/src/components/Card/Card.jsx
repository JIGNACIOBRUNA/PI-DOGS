import React from "react";
import {Link} from "react-router-dom";
import style from "./Card.module.css";

const formatImage = (image) => {
    if (typeof image === "object") {
      return image.url;
    } else {
      return image;
    }
  };

const Card = (props) =>{
    return(
        <div className={style.contenedor}>
            <Link to={`/dog/${props.id}`} className={style.dogName}>{props.name}</Link>
            <img src={formatImage(props.image)} alt="" className={style.image}/>
            <h3>{props.temperament}</h3>
            <h3>{props.weight}</h3>
        </div>
    )
}

export default Card;