import express from 'express';
import 'dotenv/config'
import sequelize from './db/config.js';
import { connectDatabase } from './models/index.js';
//Constantes

const PORT = process.env.PORT;


const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//motor de plantillas

app.set('view engine', 'pug');
app.set('views', './views');

//rutas


app.get('/login', (req, res) => {
    res.render('login');
})  

app.get('/register', (req, res) =>{
    res.render('register');
})

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/shop', (req, res) => {
    res.render('shop');
})


app.get('/art', (req, res) => {
    res.render('art');
})


//conexion a bd
sequelize.sync({alter: true}).then(() => {

    //Servidor
    app.listen(PORT, (err) => {
        if (err) {
            console.log('Error al inicar el servidor', err)
            return;
        }
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    });


})
    .catch((err) => {
        console.error('Error sincronizando la bd: ',err)
    })

