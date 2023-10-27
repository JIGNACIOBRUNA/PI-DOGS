const { API_URL, API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require ("../db");

const getTemperaments = async() =>{
    const response = await axios.get(`${API_URL}?limit=10&page=0?api_key=${API_KEY}`) 
    const temperaments = response.data.map((data) => data.temperament);// mapeo los datos de los temperamentos extraidos de la api
    let dataTemperament = temperaments.join().split(","); // utilizo join para generar una cadena de texto la cual divido con el metodo split por coma y los espacios en blanco los elimino con el metodo trim
    dataTemperament = dataTemperament.map((el) => el.trim());
    const uniqueTemperament = [...new Set(dataTemperament)]; // genero un array sin valores duplicados mediante el metodo Set
    uniqueTemperament.forEach((data) => {
    if (data !== "") {//recorro el array y verifico si no hay un string vacio si no existe se crea un nuevo registro con el nombre del temperamento 
        Temperament.findOrCreate({ where: { name: data } });
    }
    });
    const allTemperaments = await Temperament.findAll();
    const temperamentsData = allTemperaments.map(temperament => temperament.get({ plain: true }));
    //aplico el metodo get a cada elemento para que no envie los objetos complejos de sequelize 
    return temperamentsData;
}

module.exports = {
    getTemperaments
}