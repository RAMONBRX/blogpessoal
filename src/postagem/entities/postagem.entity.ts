import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_postagens"}) // create table tb_postagens
export class Postagem{
    
    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO_INCREMENT
    @ApiProperty() 
    id: number;

    @Transform(({value } : TransformFnParams) => value?.trim()) // remover espaços em branco do inicio e fim
    @IsNotEmpty() // Força digitação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    @ApiProperty() 
    titulo:string;

    @Transform(({value } : TransformFnParams) => value?.trim()) // remover espaços em branco do inicio e fim
    @IsNotEmpty() // Força digitação
    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    @ApiProperty() 
    texto: string;

    @UpdateDateColumn() // Atualza a data na criação e na atualização
    @ApiProperty() 
    data: Date;

    @ApiProperty({ type: () => Tema })
    @ManyToOne( () => Tema, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    }
    )
    tema: Tema

    @ApiProperty({ type: () => Usuario })
    @ManyToOne( () => Usuario, (usuario) => usuario.postagem,{
        onDelete: "CASCADE"
    }
    )
    usuario: Usuario;
}