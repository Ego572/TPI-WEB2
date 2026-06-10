import express from 'express';
import session from 'express-session';
import 'dotenv/config'
import sequelize from './db/config.js';
import { connectDatabase } from './models/index.js';
import userRoutes from './routes/userRoutes.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/uploadRouter.js'
//Constantes

const PORT = process.env.PORT;


const app = express();
await connectDatabase();

sequelize.sync({ force: true })
    .then(() => {
        console.log("TABLAS CREADAS");
    })
    .catch(err => {
        console.error("ERROR SYNC:", err);
    });

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


app.get('/', (req, res) => {
    res.render('index');
})

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
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((err) => {
        console.error('Error sincronizando la bd:', err);
    });

// IMPORTANTE PARA VERCEL
export default app;

