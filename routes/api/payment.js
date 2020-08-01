const express = require("express");
//const uuid = require("uuid");
//let tasklist = require("../../data/todo");
const { check, validationResult } = require("express-validator");
const router1 = express.Router();
let ToDo1 = require("../models/soldProducts");
const auth = require("../middleware/auth");
//route Get api/tasks
//desc GET all task
//access public
router1.get("/", async (req, res) => {
  try {
    const taskDb = await ToDo1.find();
    console.log(taskDb);
    res.send(taskDb);
  } catch (err) {
    res.status(500).send("Server errror");
  }
});

//route Get api/tasks/:id
//desc GET task by id
//access public
router1.get("/:id", async (req, res) => {
  try {
    const task = await ToDo1.findById(req.params.id);
    if (!task) {
      res.status(404).send("task not found");
    }
    res.send(task);
  } catch (err) {
    res.status(500).send("Server errror");
  }
});

//route post api/tasks
//desc insert task
//access public
router1.post(
  "/",
  auth,
  /*[
    check("title", "Title is not empty").not().isEmpty(),
    check("description", "length should be less than 12").isLength({ min: 12 }),
  ],*/
  async (req, res) => {
    try {
      /*const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }*/
      //console.log("id is " + req.body.title);
      const Task = new ToDo1({
        user: req.user.id,
        name: req.body.title,
        email: req.body.email,
        product: req.body.product,
        price: req.body.price,
        status: req.body.status,
      });
      //console.log(Task.title);
      const nt = await Task.save();
      res.send(nt);
    } catch (err) {
      res.status(500).send("Server errror");
    }
  }
);

//route delete api/tasks/:id
//desc delete task by id
//access public
router1.delete("/", auth, async (req, res) => {
  try {
    if (req.body.user === req.user.id) {
      await ToDo1.findByIdAndRemove({ _id: req.body.id });

      res.json({ msg: "Task deleted" });
    }

    //res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// //route put  api/tasks/
// //desc update task
// //access public
/*router.put("/", async (req, res) => {
  try {
    console.log(req.body.id);
    const taskup = await ToDo1.findById(req.body.id);
    console.log(taskup);

    if (!taskup) {
      return res.status(404).send("task not found");
    }
    taskup.description = req.body.description;
    taskup.title = req.body.title;
    taskup.status = req.body.status;
    await taskup.save();

    res.send("task added");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
*/
module.exports = router1;
