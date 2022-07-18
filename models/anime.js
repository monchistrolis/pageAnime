const mongoose = require('mongoose');
const animeShema=new mongoose.Schema({
    name:String,
    year:String,
    author:String,
    gender:String,
    episodes:String,
    origin:String,
    premierDate:String,
    lastBroadcast:String
});

module.exports=mongoose.model('listAnime',animeShema);
