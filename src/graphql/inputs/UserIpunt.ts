import { Field,InputType, ObjectType } from "type-graphql";

@InputType()
export class UserInput{
    @Field()
    username!: string;
    @Field()
    full_name!:string;
    @Field()
    password!: string;
}

@InputType()
export class UserUpdateInput{
    @Field(()=>String,{nullable:true})
    username!: string;
    @Field(()=>String,{nullable:true})
    full_name!:string;
    @Field(()=>String,{nullable:true})
    password!: string;
}
//En esta parte deben ir todos los tipos de inputs requeridos
//para procesesar los usuarios(solo datos nesesarios)
@ObjectType()
export class UserAccess{
    @Field()
    accessToken!: string    
}
@InputType()
export class UserLogin{
    @Field()
    username!: string;
    @Field()
    password!: string
}