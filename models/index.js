import sequelize from "../db/config";
import user from "./user.js"
import followers from "./follower.js"
import like from "./like.js"
import favourite from "./favourite.js"
import tag from "./tag.js"
import msg from "./msg.js"
import comment from "./comment.js"
import art from "./art.js"
import report from "./report.js"
import ratting from "./rating.js"
import interest from "./interest.js"


// un usuario puede subir muchas imagenes 


































































export async function connectDatabase() {
    try{
        await sequelize.authenticate();
        console.log("Conexion a bd establecida")
        await sequelize.sync({alter: true})
        console.log("Modelos Sincronizados")

    } catch(err){
        console.error("Error en la conexion a la Base de datos", err)


    }
    
}

