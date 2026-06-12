import { Op } from "sequelize";
import post from "../models/post.js";
import image from "../models/image.js";
import tag from "../models/tag.js";
import user from "../models/user.js";

export async function search(req, res) {
    try {
        const query = (req.query.query || "").trim();

        if (!query) {
            return res.render("search", {
                query: "",
                posts: [],
                users: []
            });
        } 

        
        const posts = await post.findAll({
            include: [
                { model: image },
                {
                    model: tag,
                    where: {
                        nameTag: { [Op.like]: `%${query}%` }
                    },
                    required: false
                }
            ],
            where: {
                [Op.or]: [
                    { titulo: { [Op.like]: `%${query}%` } },
                    { "$tags.nameTag$": { [Op.like]: `%${query}%` } }
                ]
            },
            distinct: true
        });

        const postsConImagen = posts.map(p => {
            const postJSON = p.toJSON();
            postJSON.images = postJSON.images ?? [];
            if (postJSON.images.length > 0) {
                const raw = postJSON.images[0].imageData;
                const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw?.data ?? raw);
                postJSON.images[0].base64 = buffer.toString("base64");
            }
            return postJSON;
        });

        
        const users = await user.findAll({
            where: {
                userName: { [Op.like]: `%${query}%` }
            },
            attributes: ["idUser", "userName", "description"]
        });

        res.render("search", {
            query,
            posts: postsConImagen,
            users
        });

    } catch (error) {
        console.error("Error en search: ", error);
        res.status(500).render("search", { query: "", posts: [], users: [] });
    }
}
