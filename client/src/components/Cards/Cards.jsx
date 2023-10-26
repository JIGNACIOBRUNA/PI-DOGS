import React from "react";
import Card from "../Card/Card";
// import { useSelector } from "react-redux";
import style from "./Cards.module.css";

const Cards = ({dogs}) =>{
    // const dog = useSelector(state => state.dog)
    // console.log("Filtered Dogs:", dog)
    const formatWeight = (weight) => {
        return typeof weight === "object" ? weight.metric : weight;
      };
    return(
        <div className={style.card}>
            {dogs.map(({id, name, image, temperament, weight})=>{
            return <Card
                key={id}
                id={id}
                name={name}
                image={image}
                temperament={temperament}
                weight={formatWeight(weight)}
                />
            })}
        </div>
    )
}

export default Cards;