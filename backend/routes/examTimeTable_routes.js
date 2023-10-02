const express = require("express");
const router = express.Router();
const timetable = require("../models/examTimeTable");

//Get all student groups
router.get ("/", async (req, res, next) => {
    let timetables;
    try {
        timetables = await timetable.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!timetables) {
      return res.status(404).json({ message: "No time table found" });
    }
    return res.status(200).json({ 
      success: true,
      existingtimetables: timetables 
    });
  });

    //add new student group
  router.post ("/add", async (req, res, next) => {
    const { 
        grade, 
        subject, 
        date, 
        startTime, 
        endTime, 
        examHall 
    } = req.body;
    let tmtbl; //////////////////////////////
    try {
      tmtbl = new timetable({  ///////////////////////////
        grade, 
        subject, 
        date, 
        startTime, 
        endTime, 
        examHall
      });
      await tmtbl.save();
    } catch (err) {
      console.log(err);
    }
  
    if (!tmtbl) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ 
      success:"time table record added successfully",
      timetable: tmtbl 
    });
  });


//Get specific student group
router.get("/:id",async(req,res,next) => {
    const id = req.params.id;
    let tmtbl;
    try {
        tmtbl = await timetable.findById(id)
    } catch (err) {
      console.log(err);
    }
    if (!tmtbl) {
      return res.status(404).json({ message: "No time table record found" });
    }
    return res.status(200).json({ 
      success:true,
      timetable: tmtbl
    });
  });

  //Update specific student group
  router.put('/update/:id', async(req,res) => {
    const id = req.params.id;
    const { 
        grade, 
        subject, 
        date, 
        startTime, 
        endTime, 
        examHall
    } = req.body;
    let tmtbl;
    try {
        tmtbl = await timetable.findByIdAndUpdate(id, {
            grade, 
        subject, 
        date, 
        startTime, 
        endTime, 
        examHall
      });
      tmtbl = await tmtbl.save();
    } catch (err) {
      console.log(err);
    }
    if (!tmtbl) {
      return res.status(404).json({ message: "Unable To update by this ID" });
    }
    return res.status(200).json({ 
      success: "Update Succesfully",
      timetable:tmtbl 
    });
  });

//Delete specific student group
router.delete('/delete/:id' ,async(req,res) =>{
    const id = req.params.id;
    let tmtbl;
    try {
        tmtbl = await timetable.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!tmtbl) {
      return res.status(404).json({ message: "Unable to delete by this ID" });
    }
    return res.status(200).json({ message: "Student group successfully deleted" });
  });



  module.exports = router;

