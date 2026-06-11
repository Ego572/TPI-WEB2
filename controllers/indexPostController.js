import  Post  from "../models/post.js";
import  Image  from "../models/image.js";

export async function home(req, res) {

    const posts = await Post.findAll({
        include: [Image]
    });

    const postsConImagen = posts.map(post => {
         const postJSON = post.toJSON();

        if (postJSON.images?.length > 0) {
            postJSON.images[0].base64 = 
                postJSON.images[0].imageData.toString("base64")

        }
        return postJSON;

    });

    res.render("index", {
        posts: postsConImagen
    })
    
}