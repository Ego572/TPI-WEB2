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
        if(!Post) return res.status(404).render("postDetail", {
            post: null,
            totalRating: null,
            userRating: null,
            alert: {
                status: "error",
                text: "Post no encontrado"
            }
        })

            const postJSON = Post.toJSON();

        if(postJSON.images?.length > 0 ){
            const raw = postJSON.images[0].imageData;
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
        res.status(500).render("postDetail", {
            post: null,
            totalRating: null,
            userRating: null,
            alert: {
                status: "error",
                text: "Error al cargar el post"
            }
        })
    }


    
}

 export async function createComment(req,res) {
        try {
            const {id} = req.params;
            const {texto} = req.body;
            const idUser = req.session.user?.id;

            if(!idUser ) {
                req.session.alert = { status: "error", text: "Tenes que estar logueado" };
                return res.redirect(`/post/${id}`);
            }
            if(!texto?.trim()) {
                req.session.alert = { status: "error", text: "El comentario no puede estar vacio" };
                return res.redirect(`/post/${id}`);
            }

             await comment.create({
                texto: texto.trim(),
                idUser, 
                idPost: id
             });

             req.session.alert = { status: "success", text: "Comentario agregado" };
             res.redirect(`/post/${id}`);

 


            
        } catch (error) {
            console.error("Error en createComment: ", error);
            req.session.alert = { status: "error", text: "Error al guardar el comentario" };
            res.redirect(`/post/${req.params.id}`);
            
        }
        
    }

    export async function ratePost(req, res){
    try {
        const { id } = req.params;
        const {valor } = req.body; 
        const idUser = req.session.user?.id;

        if (!idUser) {
            req.session.alert = { status: "error", text: "Tenes que estar logueado" };
            return res.redirect(`/post/${id}`);
        }
        if(!valor || valor < 1 || valor > 5 ) {
            req.session.alert = { status: "error", text: "Rating invalido" };
            return res.redirect(`/post/${id}`);
        }

        const img = await image.findOne({where: {idPost : id }});
        if(!img) {
            req.session.alert = { status: "error", text: "Imagen no encontrada" };
            return res.redirect(`/post/${id}`);
        }

        await rating.upsert({idUser, idImage: img.idImage, valor: parseInt(valor)})    

        res.redirect(`/post/${id}`);



    } catch (error) {
        console.error("Error en ratePost: ", error);
        req.session.alert = { status: "error", text: "Error al guardar el rating" };
        res.redirect(`/post/${req.params.id}`);

        
    }


}