const modelsbaseball = {
    queryGetUsers: "SELECT * FROM MLB",
    queryGetUsersByID:`SELECT * FROM MLB WHERE ID = ?`,
    queryDeleteUsersByID: `UPDATE MLB SET ESTATUS = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT NOMBRE FROM MLB WHERE NOMBRE = ?`,
    queryAddUser:
    `INSERT INTO MLB(
                            NOMBRE,
                            EQUIPO, 
                            INDICE_BATEO, 
                            POSICIONES, 
                            NACIONALIDAD, 
                            NUMERO_JUGADOR,
                            ESTATUS)
                        VALUES (
                            ?, ?, ?, ?, ?, ?, ?)`
    
    }
    
    
    module.exports = modelsbaseball