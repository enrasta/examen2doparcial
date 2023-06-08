import { DeleteResult, EntityRepository, Repository, UpdateResult } from "typeorm";
import { User } from "../entities/User";
import { UserDto } from "../entities/dto/UserDto"
import {MysqlDataSource} from "../configs/db";
import { ListPaginate } from "../entities/dto/GeneralDto";

class UserRepository{
    private repository = MysqlDataSource.getRepository(User);

    public async findByDto (params: UserDto): Promise<User[]>{
        let options={}
        options={...params}
        const [result,total] = await this.repository.findAndCount(options);
        
        return result;
    };
    
    public async findById (params: number): Promise<User | null>{
        const result = await this.repository.findOne(
            { where:
                    { id: params}
            }
        );
        return result
    };
     
    public async desactivar (userId: number){
        const firstUser = await this.repository.delete(userId);
        return firstUser;
    };
     
    public async actualizar (id:number, param: User){
        let options={}
        options={id}
        const firstUser = await this.repository.update(options,param);
        return firstUser;
    };
     
    public async registrar ( param: UserDto){
        const firstUser = await this.repository.save(param);
        return firstUser;
    };
     
     
    public async existeUsuario (params: UserDto): Promise<User|null>{    
        let options={}
        options={
            where:{user:params}}
        const result = await this.repository.findOne(options);
        return result
    };
    
    public async listAll (): Promise<ListPaginate>{
        const [result,total] = await this.repository.findAndCount();
        
        return {
            data: result,
            count: total
        }
    };
}

export default new UserRepository();