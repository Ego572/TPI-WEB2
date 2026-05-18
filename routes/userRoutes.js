import { Router } from 'express';
const router = Router();

router.get('/profile', (req, res) => {
    res.render('profile');
})

router.get('/login', (req, res) => {
    res.render('login');
})  

export default router;