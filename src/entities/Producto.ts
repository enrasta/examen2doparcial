import {Column, Entity, PrimaryColumn, CreateDateColumn, ObjectIdColumn, OneToOne, JoinColumn,ManyToOne, BaseEntity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoDto } from './dto/ProductoDto';

@Entity('producto')
export class Producto{
    
    @PrimaryGeneratedColumn({name:"ID"})
    id: number

    @Column({name:'CODIGO'})
    @Index({ unique: true })
    username:string;

    @Column({name:'ES_NACIONAL'})
    nombre:string;

    @Column({name:'NOMBRE'})
    password:string;
    @Column({name:'PRECIO'})
    precio:number;

    @CreateDateColumn({ name: "FECHA_REGISTRO" })
    fechaRegistro:Date

    @Column({ name: "FECHA_MODIFICACION" })
    fechaModificacion:Date
}