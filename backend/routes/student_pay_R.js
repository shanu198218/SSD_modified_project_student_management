const express = require('express');
const StdPayPost = require('../models/student_pay_m');

const path = require('path');

const router = express.Router();

//insert mobile payment data in data base 
router.post('/stdpay/save', (req, res) => {

    let newStdpayPost = new StdPayPost(req.body);

    newStdpayPost.save((err) => {

        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: "Student payment details saved successfully"
        });
    });
});

//retrive mobile payment data 
router.get('/stdpay', (req, res) => {
    StdPayPost.find().exec((err, stdPayPosts) => {
        if (err) {
            return res.status(400).json({

                error: err
            });
        }

        return res.status(200).json({
            success: true,
            existingPosts: stdPayPosts
        });
    });
});

//get a specific data
router.get("/stdpay/:id", (req, res) => {

    let stdId = req.params.id;
    StdPayPost.findById(stdId, (err, stdPayPosts) => {
        if (err) {
            return res.status(400).json({ success: false, err });

        }

        return res.status(200).json({
            success: true,
            stdPayPosts
        });
    });
});

router.put('/stdpay/update/:id', (req, res) => {

    StdPayPost.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, stdPayPosts) => {

            if (err) {
                return res.status(400).json({
                    error: err
                });

            }

            return res.status(200).json({
                success: "Update Succesfully"
            });
        }
    );
});


//delete mobile payment details
router.delete('/stdpay/delete/:id', (req, res) => {

    StdPayPost.findByIdAndRemove(req.params.id).exec((err, deletedStdepay) => {
        if (err) return res.status(400).json({
            message: "Delete unsucceful", err
        });

        return res.json({
            message: "Student payment details deleted succfully", deletedStdepay
        });
    });
});


module.exports = router;