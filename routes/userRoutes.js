import { Router } from 'express';
import { search } from '../controllers/searchController.js';
const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/search', search);


export default router;