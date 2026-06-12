import Post from "../models/post.js"
import Image from "../models/image.js"
import sharp from "sharp"

export async function uploadForm(req,res){
    res.render("upload");
}



export async function createPost(req,res){

    try{
        const{ title,description,imageBase64,copyright,allowComments} = req.body

        if (!imageBase64) {
        return res.status(400).send("No se recibió la imagen en Base64");
}




        const pureBase64 = imageBase64.replace(
            /^data:image\/\w+;base64,/,""
        );

        let imageBuffer = Buffer.from(
            pureBase64,"base64"
        );

        const wantsWatermark = copyright === "on";
        const username = req.session.user?.userName || req.session.user?.username || "";
        

        const post = await Post.create({

            titulo: title,
            descripcion: description,
            comentariosHabilitados: allowComments === "on"


        });

        if (wantsWatermark && username) {
            const metadata = await sharp(imageBuffer).metadata();
            const width = metadata.width || 800;
            const height = metadata.height || 600;
            const fontSize = Math.max(16, Math.floor(width / 20));

            const svgWatermark = `
                <svg width="${width}" height="${height}">
                    <style>
                        .watermark {
                            fill: rgba(255,255,255,0.5);
                            font-size: ${fontSize}px;
                            font-family: sans-serif;
                            font-weight: bold;
                        }
                    </style>
                    <text x="50%" y="95%" text-anchor="middle" class="watermark">${username}</text>
                </svg>
            `;

            imageBuffer = await sharp(imageBuffer)
                .composite([{ input: Buffer.from(svgWatermark), top: 0, left: 0 }])
                .toBuffer();
        }

        await Image.create({
            imageData: imageBuffer,
            watermark: wantsWatermark,
            watermarktext: wantsWatermark ? username : null,

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