import { CURRENT_PAGE, DETAIL_DOG, ADD_TEMPERAMENTS, FILTER_BY_TEMPERAMENTS, GET_ALL_BREED, GET_NAME_DOG, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, CREATE_BREED } from "./actionTypes";

const initialState = {
    currentPage: 1,
    dog: [],
    detail: [],
    temperament: [],
    dogFilter: [], // estado donde se van a guardar los perros filtrados
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREED:
            return { ...state, dog: action.payload, dogFilter: action.payload }; //se actualizan ambas propiedades con la misma info

        case GET_NAME_DOG:
            return { ...state, dog: action.payload, dogFilter: action.payload };

        case DETAIL_DOG:
            return { ...state, detail: action.payload };

        case ADD_TEMPERAMENTS:
            return { ...state, temperament: action.payload };

        case FILTER_BY_TEMPERAMENTS:
            const dogFilter = state.dogFilter; // aplicamos el filtro solo a dogFilter 
            const filterXTemperament = action.payload === "all" ? dogFilter : dogFilter.filter((d) => d.temperament?.includes(action.payload));
            return { ...state, dog: filterXTemperament };

        case FILTER_BY_ORIGIN:
            const allDogs = state.dogFilter;
            let filterByOrigin;
            if (action.payload === "all") {
                filterByOrigin = allDogs;
            } else if (action.payload === "created") {
                filterByOrigin = allDogs.filter((dog) => dog.id.length === 36);
            } else {
                filterByOrigin = allDogs.filter((dog) => !isNaN(dog.id));
            }
            return { ...state, dog: filterByOrigin };

        case ORDER_BY_NAME:
            if (state.dogFilter === "No Dog") return { ...state };
            const orderByName = action.payload === "asc" ?
                state.dogFilter.slice().sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
                : state.dogFilter.slice().sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
            return { ...state, dog: orderByName }

        case ORDER_BY_WEIGHT:
            if (state.dogFilter === "No Dog") return { ...state };
            const orderByWeight = action.payload === "menor" ?
                state.dogFilter.slice().sort((a, b) => parseFloat(a.weight.metric) - parseFloat(b.weight.metric))
                : state.dogFilter.slice().sort((a, b) => parseFloat(b.weight.metric) - parseFloat(a.weight.metric));
            return { ...state, dog: orderByWeight };

        case CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        case CREATE_BREED:
            return { ...state, dogFilter: action.payload }; 

        default:
            return { ...state }

    }
}

export default rootReducer;