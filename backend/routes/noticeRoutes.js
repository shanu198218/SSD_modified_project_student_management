const express = require('express');
const Posts = require('../models/noticeModels');

const router = express.Router();

//Save posts (Save notices)

router.post('/postNotice/save', (req, res) => {

    let newPost = new Posts(req.body);

    newPost.save((err) => {

        if (err) {
            return res.status(400).json({
                error: err
            });

        }
        return res.status(200).json({
            success: "Class Details Saved Successfully"
        });
    });

});

//get posts( All Notices)

router.get('/postsNotice', (req, res) => {
    Posts.find().exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });
});

//get a specific post (Get specific notice)

router.get("/postNotice/:id", (req, res) => {

    let postId = req.params.id;

    Posts.findById(postId, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            post
        });
    });
});

//update posts (Update notices)

router.put('/postNotice/update/:id', (req, res) => {
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, post) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully"
            });
        });
});

//delete post (Delete specific notice )

router.delete('/postNotice/delete/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {

        if (err) return res.status(400).json({
            message: "Delete unsuccessfull", err
        });

        return res.json({
            message: "Delete successfull", deletedPost
        });
    });
});

module.exports = router;