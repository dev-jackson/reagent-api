import express from "express";
import {ApolloServer} from 'apollo-server-express';
import { PinResolver } from "./graphql/resolvers/ping";
import { buildSchema } from "type-graphql";
import { CircleResolver } from "./graphql/resolvers/CircleResolver";
import { UserResolver } from "./graphql/resolvers/UserResolver";

export async function startServer(){
    const app = express();

    app.set('port',8000);

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                CircleResolver,
                UserResolver
            ],
            validate: false
        }),
        context: ({res, req}) => ({res, req})
    });

    server.applyMiddleware({app,path: '/graphql'});

    return app;
}