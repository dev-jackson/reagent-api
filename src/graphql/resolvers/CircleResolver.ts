import { Resolver, Query, Arg,Int, Mutation } from "type-graphql";
import { Circle } from "../../entity/Circle";
import { CircleInput,CircleUpdateInput } from "../inputs/CircleInput";

@Resolver()
export class CircleResolver{

    /** En general 
     * @params CircleInput || CircleUpdateInput 
     * @return Circle || Boolean
     */
    @Query(()=> String)
    ping(){
        return "Pong!"
    }
    @Query(()=>[Circle])
    circles(){  
        return Circle.find(); 
    }

    @Mutation(()=>Circle)
    async createCircle(
        @Arg('fields', ()=>CircleInput) fields: CircleInput
    ){
        const newCircle = Circle.create(fields);
        return await newCircle.save();
    }

    @Mutation(()=>Boolean)
    async updateCirlce(
        @Arg('id', ()=> Int) id: number,
        @Arg('fields',()=> CircleUpdateInput) fields:CircleUpdateInput
    ){
        await Circle.update(id,fields);
        return true;
    }
    @Mutation(()=>Boolean)
    async deleteCircle(@Arg('id',()=>Int) id:number){
        await Circle.delete(id);
        return true;
    }
}