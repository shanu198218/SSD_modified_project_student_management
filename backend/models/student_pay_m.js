const mongoose = require('mongoose');

const studentPayScheema = new mongoose.Schema({



    sfirstName: {
        type: String,
        required: true
    },
    slastName: {
        type: String,
        required: true
    },

    studentId: {
        type: String,
        required: true,
    },

    gradeLevel: {
        type: String,
        required: true,
    },

    mobiNum: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    parentName: {
        type: String,
        required: true,
    },

    payMethod: {
        type: String,
        required: true,
    },

    parentMnu: {
        type: String,
        required: true,
    },

});
module.exports = mongoose.model('StudentPayment', studentPayScheema);

