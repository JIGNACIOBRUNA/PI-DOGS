const { Dog, Temperament } = require("../db");
const axios = require("axios");
const {API_URL, API_KEY} = process.env;

const getApiDog = async () =>{
    //obtengo los perros de la API
    const dogUrl = await axios.get(`${API_URL}?api_key=${API_KEY}`)
    const dogApi = dogUrl.data;
    // console.log(1, dogApi);
    return dogApi;
}
    
const getDbDog = async () =>{
//obtengo los perros de la DB
    return await Dog.findAll({// mediante findAll obtengo todas las razas de perro del modelo Dog
        include: {
            model: Temperament,
            attributtes: ["name"]
        }
    })
}

const getAllDog = async () =>{
    const totalApi = await getApiDog();
    const totalDb = await getDbDog();
    const totalApiDb = [...totalApi, ...totalDb];
    return totalApiDb;
}


const getDogByName = async (name) =>{
    const searchDog = await axios.get(`${API_URL}search?q=${name}`)
    const dogApi = searchDog.data;
    return dogApi;

}

const searchByName = async () =>{
    const dogApi = await getDogByName();
    const dogDb = await getDbDog();
    const totalDog = [...dogApi, ...dogDb];
    return totalDog
}

const createDog = async (image, name, height, weight, life_span, temperament) =>{
    const newDog = await Dog.create({image, name, height, weight, life_span, temperament})
    return newDog
}

 


module.exports = {
    getAllDog, 
    searchByName,
    createDog
}
    