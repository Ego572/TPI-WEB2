import user from "../models/user.js";
import Follower from "../models/follower.js";
import post from "../models/post.js";
import image from "../models/image.js";


export async function userProfile(req, res) {
    try {
        const { id } = req.params;
        const sessionUserId = req.session.user?.id;

        const profileUser = await user.findOne({
            where: { idUser: id },
            attributes: ["idUser", "userName", "description"]
        });

        if (!profileUser) return res.status(404).send("Usuario no encontrado");

        const posts = await post.findAll({
            where: { idUser: id },
            include: [{ model: image }]
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

        const followersCount = await Follower.count({ where: { following_id: id } });
        const followingCount = await Follower.count({ where: { follower_id: id } });

        let isFollowing = false;
        if (sessionUserId) {
            const existing = await Follower.findOne({
                where: { follower_id: sessionUserId, following_id: id }
            });
            isFollowing = !!existing;
        }

        res.render("profile", {
            profileUser: profileUser.toJSON(),
            posts: postsConImagen,
            followersCount,
            followingCount,
            isFollowing,
            isOwnProfile: sessionUserId == id
        });

    } catch (error) {
        console.error("Error en Profile: ", error);
        res.status(500).send("Error al cargar el perfil");
    }
}


export async function followUser(req, res) {
    try {
        const { id } = req.params; 
        const sessionUserId = req.session.user?.id;

        if (!sessionUserId) return res.status(401).send("Tenes que estar logueado");
        if (parseInt(id) === sessionUserId) return res.status(400).send("No te podes seguir a vos mismo");

        const targetUser = await user.findOne({ where: { idUser: id } });
        if (!targetUser) return res.status(404).send("Usuario no encontrado");

        await Follower.findOrCreate({
            where: { follower_id: sessionUserId, following_id: id },
            defaults: { follower_id: sessionUserId, following_id: id }
        });

        res.redirect(`/profile/${id}`);

    } catch (error) {
        console.error("Error en followUser: ", error);
        res.status(500).send("Error al seguir al usuario");
    }
}


export async function unfollowUser(req, res) {
    try {
        const { id } = req.params;
        const sessionUserId = req.session.user?.id;

        if (!sessionUserId) return res.status(401).send("Tenes que estar logueado");

        await Follower.destroy({
            where: { follower_id: sessionUserId, following_id: id }
        });

        res.redirect(`/profile/${id}`);

    } catch (error) {
        console.error("Error en unfollowUser: ", error);
        res.status(500).send("Error al dejar de seguir al usuario");
    }
}
