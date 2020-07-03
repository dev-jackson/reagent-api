import { 
    Resolver,
    Query,
    Mutation,
    Arg,
    Int,
    UseMiddleware,
    Ctx
} from "type-graphql";
import { User } from "../../entity/User";
import { UserInput, UserUpdateInput, UserLogin, UserAccess } from "../inputs/UserIpunt";
import { hash, compare } from "bcrypt";
import { Auth } from "../../controllers/auth";
import { Context } from "../../controllers/Context";
import { sign } from "jsonwebtoken";

@Resolver()
export class UserResolver{

    @Query(()=> String)
    ping(){
        return "Pong!"
    }
    
    @Query(()=>String)
    @UseMiddleware(Auth)
    async Access(@Ctx() {payload}:Context){
        return `Your user ID: ${payload!.userId}`
    }


    @Query(()=>[User])
    async users(){
        return await User.find()
    }

    @Mutation(()=>User)
    async createUser(
        @Arg('fields',()=>UserInput) fields: UserInput
    ){
        fields.password = await hash(fields.password,13);
        const newUser = User.create(fields);
        return await newUser.save();
    }

    @Mutation(()=>Boolean)
    async updateUser(
        @Arg('id',()=>Int) id:number,
        @Arg('fields',()=>UserUpdateInput) fields: UserUpdateInput
    ){
        await User.update(id,fields);
        return true;
    }

    @Mutation(()=>Boolean)
    async deleteUser(@Arg('id') id:number){
        await User.delete(id);
        return true;
    }
    @Mutation(()=> UserAccess)
    async login(@Arg('fields') fields: UserLogin){
        const user = await User.findOne({where:{ username: fields.username }});
        
        if(!user) throw new Error("Not foud user");

        const verify = await compare(fields.password,user.password);

        if(!verify) throw new Error("Bad password");
        
        return { 
            accesToken: sign({userId: user.user_id},'SecretKey',{
                expiresIn: "30m"
            })
        };
    }

}