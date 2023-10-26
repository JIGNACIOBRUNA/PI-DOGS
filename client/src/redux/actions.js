import axios from "axios";
import { GET_ALL_BREED, LOCAL_HOST, GET_NAME_DOG, DETAIL_DOG, ADD_TEMPERAMENTS, FILTER_BY_TEMPERAMENTS, CURRENT_PAGE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, CREATE_BREED } from "./actionTypes";

export const allBreed = () =>{
    return async (dispatch) =>{
        const apiData = await axios.get(`${LOCAL_HOST}/dog`)
        const dog = apiData.data;
        return dispatch({ type: GET_ALL_BREED, payload: dog })
    };
};

export const getNameDog = (name) =>{
    return async(dispatch) =>{
        const apiData = await axios.get(`${LOCAL_HOST}/dog/?name=${name}`)
        const nameDog = apiData.data;
        return dispatch({ type: GET_NAME_DOG, payload: nameDog})
    }
}

export const detailDog = (id) =>{
    return async(dispatch) =>{
        const apiData = await axios.get(`${LOCAL_HOST}/dog/${id}`)
        const idDog = apiData.data;
        return dispatch ({ type: DETAIL_DOG, payload: idDog })
    }
}

export const addTemperaments = () =>{
    return async (dispatch) => {
          const response = await axios.get(`${LOCAL_HOST}/temperament`);
          const temperamentDog = response.data;
          return dispatch({type: ADD_TEMPERAMENTS, payload: temperamentDog });  
      };
}

export const filterTemperaments = (temperament) => {
    return dispatch => {
      dispatch ({type: FILTER_BY_TEMPERAMENTS, payload: temperament })
  }
}

export const filterOrigin = (originType) =>{
    return dispatch =>{
        dispatch({type: FILTER_BY_ORIGIN, payload: originType})
    }
}

export const orderByName = (payload) =>{
    return dispatch =>{
        dispatch({type: ORDER_BY_NAME, payload})
    }
}

export const orderByWeight = (payload) =>{
    return dispatch =>{
        dispatch({type: ORDER_BY_WEIGHT, payload})
    }
}

export const setCurrentPage = (page) =>{
    return dispatch =>{
        dispatch({type: CURRENT_PAGE, payload: page})
    }
}

export const createBreed = (payload) =>{
    console.log(payload);
    return async (dispatch) =>{
        const apiData = await axios.post(`${LOCAL_HOST}/dog`, payload);
        const newDog = apiData.data;
        return dispatch({type: CREATE_BREED, payload: newDog})
    }
}




