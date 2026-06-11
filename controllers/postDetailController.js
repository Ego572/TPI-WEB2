import  post  from "../models/post.js";
import  image  from "../models/image.js";
import  rating  from "../models/rating.js";
import { Sequelize } from "sequelize";

export async function postDetail(req, res) {
    try {
        const {id } = req.params;
        const Post = await post.findOne({
            where: { idPost: id},
            include: [
                {model: image},
                {model: rating}
            ]

        });
        if(!post) return res.status(404).send("Post no encontrado")
            const postJSON = post.toJSON();

        if(postJSON.images?.length > 0 ){
            const rawn = postJSON.images[0].imageData;
            const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw?.data ?? raw);
            postJSON.images[0].base64 = buffer.toString("base64");
        }

        const ratings = postJSON.ratings ?? [];
        const totalRating = ratings.length > 0 
        ? (ratings.reduce((sum, r) => sum + r.valor, 0) / ratings.length).toFixed(1)
            : null

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