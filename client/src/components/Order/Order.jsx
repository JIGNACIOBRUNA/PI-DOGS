import React from "react";
import { useDispatch } from "react-redux";
import { orderByName, orderByWeight } from "../../redux/actions";


const Order = ({setOrder}) =>{
    const dispatch = useDispatch();

    const handleSort = (e) => {
      setOrder(e.target.value)
      if (e.target.value === 'asc' || e.target.value === 'desc') dispatch(orderByName(e.target.value));
      if (e.target.value === 'mayor' || e.target.value === 'menor') dispatch(orderByWeight(e.target.value));
    }
    return(
        <div>
            <select defaultValue='DEFAULT' onChange={handleSort}>
                <option value="DEFAULT" >Order</option>
                <option value="asc">(A-Z)</option>
                <option value="desc">(Z-A)</option>
            </select>
            <select defaultValue='DEFAULT' onChange={handleSort}>
                <option value="DEFAULT" >Weight</option>
                <option value="menor">Weight (asc)</option>
                <option value="mayor">Weight (desc)</option>
            </select>
        </div>
    )
}

export default Order;