const mongoose = require('mongoose');

const teachersalaryScheema = new mongoose.Schema({



    teachName: {
        type: String,
        required: true
    },
    teachId: {
        type: String,
        required: true
    },

    workingday: {
        type: String,
        required: true,
    },

    leaveDay: {
        type: String,
        required: true,
    },

    epf: {
        type: String,
        required: true,
    },

    basicsal: {
        type: String,
        required: true,
    },

    deparment: {
        type: String,
        required: true,
    }

   

});
module.exports = mongoose.model('Teacher_Salary', teachersalaryScheema);

