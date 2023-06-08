import express, { application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
//import UserController from './controllers/usuario.controller';
//import LibroController from './controllers/libro.controller';
import TestController from './controllers/TestController';

const app = express();

app.use(cors({
    exposedHeaders: ['Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());

app.use((err:any, req:any, res:any, next:any) => {
	if (err) {
	  console.error('Invalid Request data')
	  res.send('Petición de request invalido')
	} else {
	  next();
	}
});

app.get('/test',TestController.test);
app.post('/test/:id',TestController.test);


app.get('/user/list',TestController.obtener);
app.post('/user/create',TestController.registrar);
app.put('/user/edit/:id',TestController.editar);
app.delete('/user/delete/:id',TestController.eliminar);

app.get('/producto/list',ProductoController.obtener);
app.post('/producto/create',TestController.registrar);
app.put('/producto/edit/:id',TestController.editar);
app.delete('/producto/delete/:id',TestController.eliminar);

app.get("/test2", (req, res)=>{
        var tipo="GET";
        res.send(`Hola Mundo! (${tipo})`);
    })

export default app;