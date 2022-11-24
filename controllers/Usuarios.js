const{reques, response, request} = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")

const {modelUsuarios, updateUsuario} = require("../models/usuarios")
//const {queryUserExists} = require("../models/usuarios")


const getUsers = async (req = reques, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query(modelUsuarios.queryGetUsers, (error) => {if (error) throw error})

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

const getUserByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelUsuarios.queryGetUsersByID, [id], (error) => {if (error) throw error})
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



const deleteUserByID = async (req = request, res = response) =>{
        const {id} = req.params
        let conn
        try{
            conn = await pool.getConnection() //realizamos la conexion
            
            //generamos la consulta
            const result = await conn.query(modelUsuarios.queryDeleteUsersByID, [id], (error) => {if (error) throw error})
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


const addUser = async (req = request, res = response) => {
    const {Nombre, Apellidos, Edad, Genero = '', Usuario, Contrasena, Fecha_Nacimiento = '2001-08-12', Activo} = req.body//URI params

    if(!Nombre || !Apellidos || !Edad || !Usuario || !Contrasena || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    const salt = bcryptjs.genSaltSync()
    const cc = bcryptjs.hashSync(Contrasena, salt)
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(modelUsuarios.queryUserExists,[Usuario])
        
        if(userExist){
            res.status(400).json({msg: `El usuario '${Usuario}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelUsuarios.queryAddUser,
                        [Nombre,
                        Apellidos, 
                        Edad, 
                        Genero, 
                        Usuario, 
                        cc,
                        Fecha_Nacimiento, Activo], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${Nombre}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre ${Nombre}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}




const updateUserByUsuario = async (req = request, res = response) =>{
    const {
       
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Usuario,
        Contrasena,
        Fecha_Nacimiento,
        Activo

    } = req.body

    if (
        !Nombre||
        !Apellidos||
        !Edad||
        !Contrasena       
    ){
        res.status(400).json({msg:"Falta datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user]=await conn.query(modelUsuarios.queryUserExists,[Usuario])
        if (!user){
            res.status(403).json({msg: `El usuario ${Usuario} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updateUsuario(
            Nombre,
            Apellidos,
            Edad,
            Genero,
            Fecha_Nacimiento,
            Activo,
            Usuario
            
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg: `El usuario ${Usuario} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const signIn = async (req = request, res = response) =>{
    const {Usuario, Contrasena} = req.body

    if(!Usuario || !Contrasena){
        res.status(400).json({msg: "Faltan datos."})
        return
    }
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelUsuarios.querySignIn, [Usuario],
         (error) => {if (error) throw error})
        
         if(!user){
            res.status(403).json({msg: "El usuario o contraseña son incorrectos"})
            return
         }

         const contrasenaValida = bcryptjs.compareSync(Contrasena, user.Contrasena)
         if(!contrasenaValida){
            res.status(403).json({msg: "El usuario o contraseña son incorrectos"})
            return
         }

        res.json({msg:`El usuario se ha conectado correctamente.`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}


const cambioc = async (req = request, res = response) =>{
    const {Usuario, Contrasena, nuevaContrasena} = req.body

    if(!Usuario || !Contrasena || !nuevaContrasena){
        res.status(400).json({msg: "Faltan datos."})
        return
    }

    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [getPass] = await conn.query(`SELECT Contrasena FROM Usuarios WHERE Usuario = '${Usuario}'`,
        (error) => {if (error) throw error})
         
        if(!getPass){
            res.status(403).json({msg: "Usuario o Contraseña mal escritos!!"})
            return
         }

         const passvalid = bcryptjs.compareSync(Contrasena, getPass.Contrasena)
         const salt = bcryptjs.genSaltSync()
         const cc = bcryptjs.hashSync(nuevaContrasena, salt)
         if(!passvalid){
            res.status(403).json({msg: "El usuario o contraseña son incorrectos"})
            return
         }
         const updatepass = await conn.query(`UPDATE Usuarios SET Contrasena = '${cc}' 
         WHERE Usuario = '${Usuario}'`,(error) => {if (error) throw error})
        res.json({msg:`La contraseña se ha modificado correctamente.`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}


module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario, signIn, cambioc}