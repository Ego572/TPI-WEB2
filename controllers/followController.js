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

        if (!profileUser) {
            req.session.alert = { status: "error", text: "Usuario no encontrado" };
            return res.redirect("/");
        }

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
        req.session.alert = { status: "error", text: "Error al cargar el perfil" };
        res.redirect("/");
    }
}


export async function followUser(req, res) {
    try {
        const { id } = req.params; 
        const sessionUserId = req.session.user?.id;

        if (!sessionUserId) {
            req.session.alert = { status: "error", text: "Tenes que estar logueado" };
            return res.redirect(`/profile/${id}`);
        }
        if (parseInt(id) === sessionUserId) {
            req.session.alert = { status: "error", text: "No te podes seguir a vos mismo" };
            return res.redirect(`/profile/${id}`);
        }

        const targetUser = await user.findOne({ where: { idUser: id } });
        if (!targetUser) {
            req.session.alert = { status: "error", text: "Usuario no encontrado" };
            return res.redirect("/");
        }

        await Follower.findOrCreate({
            where: { follower_id: sessionUserId, following_id: id },
            defaults: { follower_id: sessionUserId, following_id: id }
        });

        req.session.alert = { status: "success", text: "Ahora seguis a este usuario" };
        res.redirect(`/profile/${id}`);

    } catch (error) {
        console.error("Error en followUser: ", error);
        req.session.alert = { status: "error", text: "Error al seguir al usuario" };
        res.redirect(`/profile/${req.params.id}`);
    }
}


export async function unfollowUser(req, res) {
    try {
        const { id } = req.params;
        const sessionUserId = req.session.user?.id;

        if (!sessionUserId) {
            req.session.alert = { status: "error", text: "Tenes que estar logueado" };
            return res.redirect(`/profile/${id}`);
        }

        await Follower.destroy({
            where: { follower_id: sessionUserId, following_id: id }
        });

        req.session.alert = { status: "success", text: "Dejaste de seguir a este usuario" };
        res.redirect(`/profile/${id}`);

    } catch (error) {
        console.error("Error en unfollowUser: ", error);
        req.session.alert = { status: "error", text: "Error al dejar de seguir al usuario" };
        res.redirect(`/profile/${req.params.id}`);
    }
}