const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  
    noticeType:{
        type:String,
        required:true
    },
    noticeDate:{
        type:Date,
        required:true
    },
    noticeTitle:{
        type:String,
        required:true
    },
    noticeBody:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('notice', postSchema)