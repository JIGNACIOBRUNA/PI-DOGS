const { Router } = require ("express");
const router = Router();
const {getTemperament} = require ("../handlers/temperamentHandler");

router.get("/", getTemperament)


module.exports = router;