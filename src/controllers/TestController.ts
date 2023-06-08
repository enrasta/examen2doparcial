import { Request,Response } from "express";
import { User } from "../entities/User";
import { MysqlDataSource } from "../configs/db";

const repository = MysqlDataSource.getRepository(User);
class TestController{

    //private repository = MysqlDataSource.getRepository(User);

    /*app.get("/test", (req, res)=>{
        var tipo="GET";
        res.send(`Hola Mundo! (${tipo})`);
    })*/
    
    public async test(req:Request, res:Response){
        const id= req.params.id;
        const user= req.body;
        const tipo= req.query.tipo;
        const texto= req.query.texto;
        console.log("id", id)
        console.log("user", user)
        console.log("tipo", tipo)
        console.log("texto", texto)
        console.log("__dirname", __dirname)
        res.send(`Hola Mundo ${req.method}`);
    }

    //GET listar los x primeros resgitros
    public async obtener(req:Request, res:Response){
        const lista = await repository.find();
        res.send(lista);
    }

    //POST
    public async registrar(req:Request, res:Response){
    }

    //PUT
    public async editar(req:Request, res:Response){
    }

    //DELETE
    public async eliminar(req:Request, res:Response){
    }


}
export default new TestController();