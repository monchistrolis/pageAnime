const express = require('express');
const mongoose = require('mongoose');
const {ApolloServer,gql}=require('apollo-server-express');
const anime = require('./models/anime');
const cors = require('cors');


mongoose.connect("mongodb+srv://mochistrolis:83245112r1a2a3@cluster0.qolq8.mongodb.net/Anime",{useNewUrlParser:true,useUnifiedTopology:true});

const typeDefs = gql`
    type Anime {
        id:ID!
        name:String!
        year:String
        author:String
        gender:String
        episodes:String
        origin:String
        premierDate:String
        lastBroadcast:String
    }
    type alert {
        messege:String
    }
    input AnimeInput {
        name:String!
        year:String
        author:String
        gender:String
        episodes:String
        origin:String
        premierDate:String
        lastBroadcast:String
    }
    type Query{
        getlistAnime(page:Int,limit:Int=1) :[Anime]
        getanime(id: Int): alert
    }
    type Mutation{
        addanime(input:AnimeInput):Anime
        updateanime(id:Int,input:AnimeInput):Anime
        deleteanime(id:Int):alert
    }
    `;

    const resolvers = {
        Query:{
            async getlistAnime(obj,{page,limit}){
                const listAnime = await anime.find();
                return listAnime;
            },
            async getanime(obj,{id}){
                const anime = await anime.findById(id);
                return anime;
            }
        },
        Mutation:{
            async addanime(obj,{input}){
                const anime = new anime(input);
                anime.save();
                return anime;
            },
            async updateanime(obj,{id,input}){
                const anime = await anime.findByIdAndUpdate(id,input);
                return anime;
            },
            async deleteanime(obj,{id}){
                const anime = await anime.findByIdAndDelete(id);
                return anime;
            },
        },
    };

let apolloServer=null;

const corsOptions = {
    origin: 'http://localhost:3000/serverPagina',
    Credential: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
    };

async function startServer() {
    const apolloServer=new ApolloServer({typeDefs,resolvers,corsOptions});
    await apolloServer.start();

    apolloServer.applyMiddleware({app,cors :false});
}

    startServer();

    const app =  new express();
    app.use(cors());
    app.listen(3000,function(){
        console.log("serivdor corriendo exitosamente en el puerto 3000");
    })