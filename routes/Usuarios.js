const{Router} = require("express")
const { getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario, signIn, cambioc } = require("../controllers/Usuarios")

const router = Router()

//http://localhost:4000/api/v1/users/
//get
router.get("/", getUsers)

router.get("/id/:id", getUserByID)

//delete
router.delete("/id/:id", deleteUserByID)

//use
router.post("/", addUser)
router.post("/signin", signIn)
router.post("/signin/cambioc", cambioc)
//update
router.put("/", updateUserByUsuario)

module.exports = router