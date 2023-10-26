// const { UUID } = require("sequelize");
const {isUuid} = require("uuidv4");
const { getAllDog, createDog } = require ("../controllers/dogController");
const { Temperament } = require("../db");

const getBreedDog = async (req, res) =>{
    const { name } = req.query;
    const dog = await getAllDog();
    try {
        if(!name){
            res.status(200).json(dog);// si no hay un nombre en especifico manda toda las razas 
            // console.log(dog);
        }else{// sino realiza el filtrado por el nombre ademas de que no importa si esta en mayuscula o miniscula
            let dogName = dog.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(dogName.length){
                res.status(200).json(dogName)
            }else{
                res.status(404).send("El nombre del perro no existe")
            }
            // dogName.length ? res.status(200).json(dogName) : res.status(404).send("El nombre del perro no existe")
        }   //si existe dogName se envia la info como un json   sino se manda el mensaje de error 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la raza de perros" });
        console.log(error);
        
    }
}

const getIdBreed = async (req, res) =>{
    const { id } = req.params;
    const dogsTotal = await getAllDog();
    let esUuid = false;
    try {
        if(isUuid(id)){// verifico si el id que me llega es un uuid
            esUuid = true;
            // console.log("si es un uuidv4", id);
        }else if(!isNaN(id)){
            esUuid = false;
            // console.log("si es numero", id);
        }else{
            throw Error("Formato de ID no valido");
        }
        // if (isNaN(+id) && id.length !== 36) {
        //   throw Error("Error al obtener la raza de perro");
        // }
        const breedId = dogsTotal.filter((el) => {
            if(esUuid){
                return el.id === id;
            }else{
                return el.id === +id;
            }
        });
        res.status(200).json(breedId);
        console.log(breedId);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}


const postBreed = async (req, res) =>{
    try {
        const { image, name, height, weight, life_span, temperament} = req.body;
        const newDog = await createDog(image, name, height, weight, life_span, temperament)
        const temperamentCreated = await Temperament.findAll({
            where:{name:temperament}
        })
        await newDog.addTemperament(temperamentCreated) // genera la relacion entre la el t de la db y el perro creado 
        res.status(200).json(newDog);
        console.log(newDog);
    } catch (error) {
        console.log(error);
        res.status(400).send("No se creo el nuevo perro")
    }

}    

module.exports = {
    getBreedDog,
    getIdBreed,
    postBreed
    
}