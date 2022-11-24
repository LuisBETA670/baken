// http:localhost:4000/api/v1/messages

const {Router} = require('express') 
const { 
    rootMessage, 
    himessage, 
    byeMessage, 
    postMessage, 
    putMessage, 
    deleteMessage 
} = require('../controllers/messages')

const router = Router()



router.get('/', rootMessage) //End point   consultar
router.get('/hi/:name/:edad', himessage) //End point
router.get('/bye', byeMessage) //End point

router.post('/', postMessage) // crear o añadir
router.put('/', putMessage)//actualizar registros
router.delete('/', deleteMessage)//eliminar registros



module.exports = router