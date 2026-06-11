import  Post  from "../models/post.js";
import  Image  from "../models/image.js";

export async function home(req, res) {
    
try {
    const posts = await Post.findAll({
        include:[
            {
                model: Image
            }
        ]
    });

    

    const postsConImagen = posts.map(post => {
         const postJSON = post.toJSON();

        postJSON.images = postJSON.images ?? [];

        if (postJSON.images?.length > 0) {
            postJSON.images[0].base64 = 
                Buffer.from(postJSON.images[0].imageData).toString("base64")

        }
        return postJSON;

    });
    

    res.render("index", {
        posts: postsConImagen
    })
      } catch (error) {
        console.error("Error en home", error);
        res.render("index", {posts: []});
    
}  
}