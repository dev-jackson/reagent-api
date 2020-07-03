import { Query, Resolver } from "type-graphql";

@Resolver()
export class PinResolver{
    @Query(()=> String)
    ping(){
        return "Pong!"
    }
}