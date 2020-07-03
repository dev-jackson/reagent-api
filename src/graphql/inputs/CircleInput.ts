import { InputType, Field } from "type-graphql";

@InputType()
export class CircleInput{
    @Field()
    name!: string;
    @Field()
    description!: string;
}

@InputType()
export class CircleUpdateInput{
    @Field(() => String, {nullable: true})
    name!: string;
    @Field(() => String, {nullable: true})
    description!: string;
}
//() => String, {nullable: true}
//En esta parte deben ir todos los tipos de inputs requeridos
//para procesesar los usuarios(solo datos nesesarios)