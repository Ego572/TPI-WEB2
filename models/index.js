import sequelize from "../db/config";
import User from "./user.js"
import Followers from "./follower.js"
import like from "./like.js"
import favourite from "./favourite.js"
import tag from "./tag.js"
import msg from "./message.js"
import comment from "./comment.js"
import report from "./Report.js"
import rating from "./rating.js"
import interest from "./interest.js"
import collection from "./collection.js"
import post from "./post.js";
import image from "./image.js";
import user from "./user.js";
import message from "./message.js";
import notification from "./notification.js";


//Un usuario puede crear muchos posts
user.hasMany(post, {
    foreignKey: "idUser"
});

post.belongsTo(user,{
    foreignKey: "idUser"
});

//un post tiene muchas imagenes

post.hasMany(image,{
    foreignKey: "idPost"
});

image.belongsTo(post,{
    foreignKey: "idPost"
});

//Un usuario escribe muchos comentarios 

user.hasMany(comment,{
    foreignKey: "idUser"
});

comment.belongsTo(user,{
    foreignKey: "idUser"
});


//un post tiene muchos comentaros

post.hasMany(comment,{
    foreignKey: "idPost"
});

comment.belongsTo(post,{
    foreignKey: "idPost"
});

//un usuario puede valorar muchas imagenes

user.hasMany(rating,{
    foreignKey: "idUser"
});

rating.belongsTo(user,{
    foreignKey:"idUser"
});

//una iamgen tiene muchas valoraciones

image.hasMany(rating,{
    foreignKey: "idImage"
});

rating.belongsTo(image,{
    foreignKey: "idImage"
});

// un usuario marca muchas imagenes como "me interesa"

user.hasMany.apply(interest,{
    foreignKey: "idUser"
});

interest.belongsTo(user,{
    foreignKey: "idUser"
})

//una imagen puede interesar a muchos usuarios

image.hasMany(interest,{
    foreignKey: "idImage"
})

interest.belongsTo(Image,{
    foreignKey: "idImage"
})


//Un usuario puede seguir a muchos usuarios 

user.belongsToMany(user, {
    through: Followers,
    as: "following",
    foreignKey: "following_id"
})

user.belongsToMany(user,{
    through: Followers,
    as: "followers",
    foreignKey:"following_id"
})


// un usuario puede mandar mensajes a otro usuario

user.hasMany(message,{
    foreignKey: "idSender",
    as: "sentMessage"
})

user.hasMany(message,{
    foreignKey: "idReceiver",
    as: "sender"
})

message.belongsTo(user,{
    foreignKey: "idReceiver",
    as: "receivedMessages"

})

message.belongsTo(user,{
    foreignKey: "idSender",
    as: "receiver"
})

message.belongsTo(user,{
    foreignKey: "idReceiver",
    as: "receiver"
})


//Un usuario recibe 0 o muchas notificaciones

user.hasMany(notification,{
    foreignKey: "idUserDestino"
})

notification.belongsTo(user,{
    foreignKey: "idUserDestino"
})


//Usuario q genero la notificacion

notification.belongsTo(user,{
    foreignKey: "idUserOrigen",
    as: "originUser"
})

//un usaurio puede ahcer  muchos reportas

user.hasMany(report,{
    foreignKey: "idUser"
})

report.belongsTo(user,{
    foreignKey: "idUser"
})


//un comentario puede tener muchos reportes

comment.hasMany(report,{
    foreignKey: "idComment"
})

report.belongsTo(comment,{
    foreignKey:"idComment"
})

//una imagen puede tener muchos reportes 

image.hasMany(report,{
    foreignKey: "idImage"
})

report.belongsTo(image,{
    foreignKey:"idImage"
})

//un usuario crea muchas colecciones 

user.hasMany(collection,{
    foreignKey: "idUser"
})

collection.belongsTo(user,{
    foreignKey: "idUser"
})

//una coleccion tiene muchos posts y un post puede estar en muchas colecciones

collection.belongsToMany(post,{
    through: "CollectionPost"
})

post.belongsToMany(collection, {
    through: "CollectionPost"
})

// un post puede tener muchos tags y un tag pertenece a muchos posts

post.belongsToMany(tag,{
    through: "PostTag"
})

tag.belongsToMany(post, {
    through: "PostTag"
})







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

