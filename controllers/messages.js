const { request, response } = require("express")
//Query Params
const rootMessage = (req = request, res = response) => {
    const{nombre, apellido_paterno} = req.query
    //console.log(nombre)
    if(!nombre){
        res.status(400).json({msg: "Falta indicar el nombre"})
        return
}

if(!apellido_paterno){
    res.status(400).json({msg: "Falta indicar el apellido paterno"})
    return
}


res.status(404).json({msg: 'MI nombre es ' +nombre+' '+apellido_paterno})


}



//URI Params
const himessage = (req = request, res = response) => {
    //console.log(req.params)
    const {name, edad} = req.params
    res.status(400).json({msg: 'Hola ' +name+ ' ' +edad})
}
















const byeMessage = (req= request, res = response) => {
    res.status(401).json({msg: 'Adios mundo'})
}



const postMessage = (req= request, res = response) => {
    const{no_control, nombre}= req.body
    console.log({no_control, nombre})
    res.status(405).json({msg:`NUmero de control: ${no_control}, nombre: ${nombre}`})
}

const putMessage = (req = request, res = response) => {
    res.status(409).json({msg:'Mensaje put'})
}

const deleteMessage = (req= request, res = response) => {
    res.status(414).json({msg:'Mensaje delete'})
}



module.exports = {
    rootMessage, himessage, byeMessage, postMessage, putMessage, deleteMessage}