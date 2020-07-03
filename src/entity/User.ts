import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, ManyToMany, JoinTable,} from "typeorm";
import { Circle } from "./Circle";
import { ObjectType, Field, Int } from "type-graphql";
@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    user_id!: number;
    @Field()
    @Column()
    username!: string;
    @Field()
    @Column()
    full_name!: string;
    @Field()
    @Column()
    email!: string;
    @Field()
    @Column()
    password!: string
    @Field()
    @CreateDateColumn({type: 'timestamp'})
    update_at!: string;
    @Field()
    @CreateDateColumn({type: "timestamp"})
    create_at!: string;
    @Field()
    @Column('bool',{default:false})
    admin!: boolean;
    @Field(()=>[Circle])
    @ManyToMany(type=> Circle, circle => circle.users,{nullable:true})
    @JoinTable()
    circles!: Circle[]
}
