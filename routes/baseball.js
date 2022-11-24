const{Router} = require("express")
const {addjugador, updateUserBybaseball, getJUGADORES, getjugadorByID, deletejugadorByID} = require("../controllers/baseball")

const router = Router()

//http://localhost:4000/api/v1/users/
//get
router.get("/", getJUGADORES)

router.get("/id/:id", getjugadorByID)

//delete
router.delete("/id/:id", deletejugadorByID)

//use
router.post("/", addjugador)

//update
router.put("/", updateUserBybaseball)

module.exports = router