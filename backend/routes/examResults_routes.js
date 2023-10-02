const express = require("express");
const router = express.Router();
const result = require("../models/examResults");

//Get all student exam results
router.get ("/results", async (req, res, next) => {
    let results;
    try {
        results = await result.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!results) {
      return res.status(404).json({ message: "No exam results found" });
    }
    return res.status(200).json({ 
      success: true,
      existingresults: results 
    });
  });

    //add new exam result
  router.post ("/result/add", async (req, res, next) => {
    const { 
        grade, 
        subject, 
        studentName, 
        studentID, 
        marks, 
        gradeReceived 
    } = req.body;
    let rslt;
    try {
      rslt = new result({  
        grade, 
        subject, 
        studentName, 
        studentID, 
        marks, 
        gradeReceived
      });
      await rslt.save();
    } catch (err) {
      console.log(err);
    }
  
    if (!rslt) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ 
      success:"Exam Result added successfully",
      result: rslt
    });
  });


//Get specific exam result
router.get("/result/:id",async(req,res,next) => {
    const id = req.params.id;
    let rslt;
    try {
        rslt = await result.findById(id)
    } catch (err) {
      console.log(err);
    }
    if (!rslt) {
      return res.status(404).json({ message: "No exam result record found" });
    }
    return res.status(200).json({ 
      success:true,
      result: rslt
    });
  });

  //Update specific student group
  router.put('/result/update/:id', async(req,res) => {
    const id = req.params.id;
    const { 
        grade, 
        subject, 
        studentName, 
        studentID, 
        marks, 
        gradeReceived
    } = req.body;
    let rslt;
    try {
        rslt = await result.findByIdAndUpdate(id, {
            grade, 
            subject, 
            studentName, 
            studentID, 
            marks, 
            gradeReceived
      });
      rslt = await rslt.save();
    } catch (err) {
      console.log(err);
    }
    if (!rslt) {
      return res.status(404).json({ message: "Unable To update by this ID" });
    }
    return res.status(200).json({ 
      success: "Update Succesfully",
      result:rslt 
    });
  });

//Delete specific student group
router.delete('/result/delete/:id' ,async(req,res) =>{
    const id = req.params.id;
    let rslt;
    try {
        rslt = await result.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!rslt) {
      return res.status(404).json({ message: "Unable to delete by this ID" });
    }
    return res.status(200).json({ message: "Exam result successfully deleted" });
  });



  module.exports = router;
