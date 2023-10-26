const { Router } = require("express");
const { getBreedDog, getIdBreed, postBreed } = require ("../handlers/dogHandlers");
const router = Router();

//configuracion de mis rutas y sus respectivas funciones handlers 
router.get("/", getBreedDog);

router.get("/:id", getIdBreed);

router.post("/", postBreed);



module.exports = router;