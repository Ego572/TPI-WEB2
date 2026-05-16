import express from 'express';
 import 'dotenv/config'
//Constantes

const PORT = process.env.PORT;


const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//motor de plantillas

app.set('view engine', 'pug');
app.set('views','./views');

//rutas
app.get('/', (req, res) => {
    res.render('index');


})



//Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});