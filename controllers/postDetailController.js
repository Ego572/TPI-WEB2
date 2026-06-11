import  post  from "../models/post.js";
import  image  from "../models/image.js";
import  rating  from "../models/rating.js";
import comment from "../models/comment.js";
import user from "../models/user.js";
import { Sequelize } from "sequelize";

export async function postDetail(req, res) {
    try {
        const {id } = req.params;
        const Post = await post.findOne({
            where: { idPost: id},
            include: [
                {model: image,
                    include:[{model: rating}]
                },

                {model: comment, 
                    include: [{model: user, attributes:["userName"]}]
                }
            ]

        });
        if(!post) return res.status(404).send("Post no encontrado")

            const postJSON = post.toJSON();

        if(postJSON.images?.length > 0 ){
            const rawn = postJSON.images[0].imageData;
            const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw?.data ?? raw);
            postJSON.images[0].base64 = buffer.toString("base64");
        }

        const ratings = postJSON.images?.[0]?.ratings ??[];
        const totalRating = ratings.length > 0 
        ? (ratings.reduce((sum, r) => sum + r.valor, 0) / ratings.length).toFixed(1)
            : null;

         const userRating = req.session.user 
         ? ratings.find(r => r.idUser === req.session.user.id)?.valor ?? null
            : null;

            res.render("postDetail",{
                post: postJSON,
                totalRating,
                userRating
            })



        
    } catch (error) {
        console.error("Error en postDetail: ", error );
            res.status(500).send("Error al cargar el post")
        
    }


    
}

 export async function createComment(req,res) {
        try {
            const {id} = req.params;
            const {texto} = req.body;
            const idUser = req.session.user?.id;

            if(!idUser ) return res.status(401).send("Tenes que estar logueado");
            if(!texto?.trim()) return res.status(400).send ("El comentario no puede estar vacio ")

             await Comment.create({
                texto: texto.trim(),
                idUser, 
                idPost: id
             });

             res.redirect(`/post/${id}`);

 


            
        } catch (error) {
            console.error("Error en createComment: ", error);
            res.status(500).send("Error al guardar el comentario");
            
        }
        
    }

    export async function ratePost(req, res){
    try {
        const { id } = req.params;
        const {valor } = req.body; 
        const idUser = req.session.user?.id;

        if (!idUser) return res.status(401).send("Tenes q estar logueado");
        if(!valor || valor < 1 || valor > 5 ) return res.status(400).send("Rating invalido ")

        const image = await image.findOne({where: {idPost : id }});
        if(!image) return res.status(404).send("Imagen no encontrada")

        await rating.upsert({idUser, idImage: image.idImage, valor: parseInt(valor)})    

        res.redirect(`/post/${id}`);



    } catch (error) {
        console.error("Error en ratePost: ", error);
        res.status(500).send("Error al guardar el rating")

        
    }


}
