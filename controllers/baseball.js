const{response, request} = require("express")
const pool = require("../db/connection")

const modelsbaseball = require("../models/baseball")
const {queryUserExists} = require("../models/baseball")

const addjugador = async (req = request, res = response) => {
    const 
        {NOMBRE,
        EQUIPO, 
        INDICE_BATEO, 
        POSICIONES, 
        NACIONALIDAD, 
        NUMERO_JUGADOR,
        ESTATUS} = req.body//URI params

    if(!NOMBRE || !ESTATUS){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

   
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(modelsbaseball.queryUserExists,[NOMBRE])
        
        if(userExist){
            res.status(400).json({msg: `El usuario '${NOMBRE}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelsbaseball.queryAddUser,
                        [NOMBRE,
                            EQUIPO, 
                            INDICE_BATEO, 
                            POSICIONES, 
                            NACIONALIDAD, 
                            NUMERO_JUGADOR,
                            ESTATUS], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre '${NOMBRE}' `})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre '${NOMBRE}' `})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}



const updateUserBybaseball = async (req = request, res = response) => {
    //const {id} = req.params
    const {NOMBRE,
        EQUIPO, 
        INDICE_BATEO, 
        POSICIONES, 
        NACIONALIDAD, 
        NUMERO_JUGADOR,
        ESTATUS} = req.body//URI params

    if(!NOMBRE || !ESTATUS){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const [userexist] = await conn.query(modelsbaseball.queryUserExists,[NOMBRE])
        
                 //generamos la consulta
                 if(!userexist){ res.json({msg:`El usuario'${NOMBRE}' no existe`})
                    return
                }

                    const result = await conn.query(`UPDATE MLB SET 
                    NOMBRE = '${NOMBRE}',
                    EQUIPO = '${EQUIPO}',
                    INDICE_BATEO = ${INDICE_BATEO},
                    POSICIONES = '${POSICIONES}',
                    NACIONALIDAD = '${NACIONALIDAD}',
                    NUMERO_JUGADOR = ${NUMERO_JUGADOR},
                    ESTATUS = '${ESTATUS}'
                    WHERE NOMBRE = '${NOMBRE}'`, (error) => {if (error) throw error})
                    
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                        res.status(404).json({msg: `No se pudo actualizar el usuario`})
                        return
                        }
   
                    res.json({msg:`Se actualizo satisfactoriamente el usuario '${NOMBRE}'`})//Se manda la lista de usuarios
                 
               
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}



const getJUGADORES = async (req = reques, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query(modelsbaseball.queryGetUsers, (error) => {if (error) throw error})

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen usuarios registrados"})
            return
        }
        res.json({users})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}



const getjugadorByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelsbaseball.queryGetUsersByID, [id], (error) => {if (error) throw error})
        console.log(user)

        if(!user){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen usuarios registrados con el ID ${id}`})
            return
        }
        res.json({user})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}


const deletejugadorByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelsbaseball.queryDeleteUsersByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen usuarios registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el usuario con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}




module.exports = {addjugador, updateUserBybaseball, getJUGADORES, getjugadorByID, deletejugadorByID}