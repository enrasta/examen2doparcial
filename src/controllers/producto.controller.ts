import { Request, response, Response } from "express";
import ProductoRepository from '../repositories/Producto.Repository';
import { ProductoDto } from '../entities/dto/ProductoDto';
import { MessageResponse } from "../entities/dto/GeneralDto";
import { Producto } from "../entities/Producto";


class ProductoController {

    public async test(req: Request, res: Response) {
        const { page, limit } = req.params;
        return res.status(200).send("Hola mundo");
    }
    
    public async list(req: Request, res: Response) {
        const { page, limit } = req.params;
        let result:MessageResponse = { success: false, message: "Error de obtencion de datos", code: 0 };
        try {
            let query = await ProductoRepository.listAll();
            result.data = query.data;
            result.success = true;
            result.message = "Obtención exitosa";
            result.total = query.count || 0;
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res.status(200).send(result);
    }
    
    public async registrar(req: Request, res: Response) {
        const productoDto = req.body as ProductoDto;

        const result: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const producto = new Producto(productoDto);
            result.success = true;
            result.message = "producto registrado";
            const oProducto = await ProductoRepository.registrar(producto);
            result.data = oProducto;

        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res.status(200).send(result);
    }
    
    public async editar(req: Request, res: Response) {
        const productoDto = req.body as ProductoDto;
        const id = parseInt(req.params.id);
        
        let result: MessageResponse = { success: false, message: "Error de registro", code: 0 };
        try {
            const producto = new Producto(productoDto);
            const productoFind = await ProductoRepository.findById(id);
            if (productoFind ) {
                result.success = true;
                result.message = "producto actualizado!";
                producto.fechaModificacion = new Date();
                await ProductoRepository.actualizar(id, codigo);
                result.data = productoDto;
            } else {
                result.message = "producto no encontrado";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res.status(200).send(result);
    }
    
    public async eliminar(req: Request, res: Response) {
        let result: MessageResponse = { success: false, message: "Error de eliminacion", code: 0 };

        try {
            const productoDtoFind = await ProductoRepository.findById(parseInt(req.params.id));
            if (productoDtoFind) {
                result.success = true;
                result.message = "producto eliminado";
                await ProductoRepository.desactivar(parseInt(req.params.id));

            } else {
                result.message = "Producto no encontrado!";
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(error);
            }
        }
        return res.status(200).send(result);
    }
  }

  export default new ProductoController();