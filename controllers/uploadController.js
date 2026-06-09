import Post from "../models/post.js"
import Image from "../models/image.js"

export async function uploadForm(req,res){
    res.render("upload");
}



export async function createPost(req,res){
    console.log(req.body)
   
    try{
        const{ title,description,imageBase64,copyright} = req.body

         console.log("Base64: ", imageBase64)
    console.log("longitud: ", imageBase64?.length);

        if (!imageBase64) {
        return res.status(400).send("No se recibió la imagen en Base64");
}




        const pureBase64 = imageBase64.replace(
            /^data:image\/\w+;base64,/,""
        );

        const imageBuffer = Buffer.from(
            pureBase64,"base64"
        );

        const post = await Post.create({

            titulo: title,
            descripcion: description,
            comentariosHabilitados: true


        });
        console.log(imageBuffer)
        await Image.create({
            imageData: imageBuffer,
            watermark: copyright === "on",

            licencia: "Copyright",
            idPost: post.idPost



        });

        res.redirect("/");












    }catch (error){
        console.error(error);

        res.status(500).send(
            "Error al crear la publicacion"
        );

    }
}