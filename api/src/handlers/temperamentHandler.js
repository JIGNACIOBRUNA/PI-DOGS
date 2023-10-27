const { getTemperaments } = require ("../controllers/temperamentController");

const getTemperament = async(req, res) =>{
    try {
        const temp = await getTemperaments();
        res.status(200).json(temp)
        console.log(temp);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error al obtener los temperamentos");
    }

}

module.exports = {
    getTemperament
}