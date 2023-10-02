const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    subjectName:{
        type:String,
        required:true
    },
    subjectCode:{
        type:String,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    teacherName:{
        type:String,
        required:true
    },      
    classType:{
        type:String,
        required:true
    },
    hallNo:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('class', postSchema)