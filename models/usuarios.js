const modelUsuarios = {
queryGetUsers: "SELECT * FROM Usuarios",
queryGetUsersByID:`SELECT * FROM Usuarios WHERE ID = ?`,
queryDeleteUsersByID: `UPDATE Usuarios SET Activo = 'N' WHERE ID = ?`,
queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = ?`,
queryAddUser:
`INSERT INTO Usuarios(
                        Nombre,
                        Apellidos, 
                        Edad, 
                        Genero, 
                        Usuario, 
                        Contrasena,
                        Fecha_Nacimiento,
                        Activo)
                    VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?)`,
querySignIn: `SELECT Contrasena, Activo FROM Usuarios WHERE Usuario = ?`
}



const updateUsuario = (
    Nombre,
    Apellidos,
    Edad,
    Genero,
    Fecha_Nacimiento,
    Activo,
    Usuario

) => {
    return 
`UPDATE Usuarios SET
Nombre = '${Nombre}',
Apellidos = '${Apellidos}',
Edad = '${Edad}',
Genero = '${Genero}',
Fecha_Nacimiento = '${Fecha_Nacimiento}',
Activo = '${Activo}'
WHERE Usuario = '${Usuario}'`

}

module.exports = {modelUsuarios, updateUsuario}