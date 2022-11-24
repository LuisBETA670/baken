const express = require('express')
const messagesRouter = require('./routes/messages')
const UsuariosRouter = require('./routes/Usuarios')
const baseballRouter = require('./routes/baseball')

const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            messages: "/api/v1/messages",
            Usuarios: "/api/v1/Usuarios",
            baseball: "/api/v1/baseball",
            
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        //this.app.get('/', (req, res) => {
        //res.send('Mensaje recibido')
       // }) //End point

       this.app.use(this.paths.messages, messagesRouter)
       this.app.use(this.paths.Usuarios, UsuariosRouter)
       this.app.use(this.paths.baseball, baseballRouter)
      
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server



