import { Column, CreateDateColumn, PrimaryGeneratedColumn, Entity, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { ObjectType, Field, Int } from "type-graphql";
@Entity()
@ObjectType()
export class Circle extends BaseEntity{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id_circle!: number;
    @Field()
    @Column()
    name!: string
    @Field()
    @Column()
    description!: string
    @Field(()=>Int)
    @Column({default: 0})
    num_member!: number;
    @Field()
    @CreateDateColumn({type: 'timestamp'})
    create_at!: string;
    @Field()
    @CreateDateColumn({type: 'timestamp'})
    update_at!: string;
    @Field(()=>[User],{defaultValue:null})
    @ManyToMany(type=>User,user=>user.circles,{nullable:true})
    @JoinTable()
    users!: User[]
}