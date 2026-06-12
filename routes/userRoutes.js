import { Router } from 'express';
import { search } from '../controllers/searchController.js';
import { userProfile, followUser, unfollowUser } from '../controllers/followController.js';


const router = Router();

router.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.redirect(`/profile/${req.session.user.id}`);
});



router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/search', search);

router.get('/profile/:id', userProfile);
router.post('/profile/:id/follow', followUser);
router.post('/profile/:id/unfollow', unfollowUser);


export default router;