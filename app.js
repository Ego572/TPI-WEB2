import express from 'express';
import session from 'express-session';
import 'dotenv/config'
import sequelize from './db/config.js';
import { connectDatabase } from './models/index.js';
import userRoutes from './routes/userRoutes.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/uploadRouter.js'
import  {  home  }  from './controllers/indexPostController.js';
//Constantes

const PORT = process.env.PORT;


const app = express();





//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
    
});

//motor de plantillas

app.set('view engine', 'pug');
app.set('views', './views');

//rutas

app.use('/', userRoutes);
app.use('/', authRouter);
app.use('/upload', uploadRouter);
app.use(express.static('public'));


app.get('/', home);
    

app.get('/shop', (req, res) => {
    res.render('shop');
})


app.get('/art', (req, res) => {
    res.render('art');
})

app.get('/upload', (req, res) => {
    res.render('upload');
})

app.get('/profile', (req, res) => {
    res.render('profile');
});




//conexion a bd
await connectDatabase();

// IMPORTANTE PARA VERCEL
export default app;

