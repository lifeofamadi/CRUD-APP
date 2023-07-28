const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const fs = require("fs")

//image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

//insert an user into database route
router.post("/add", upload, async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });

    const savedUser = await user.save();

    req.session.message = {
      type: "success",
      message: "User added successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

// Get all users route
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", {
      title: "Home page",
      users: users,
    });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
});

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add Users" });
});

//Edit an user route
router.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findById(id);
    return res.render("edit_users", {
      title: "Edit Users",
      user: user,
    });
  } catch (err) {
    return res.redirect("/");
  }
});

//update user route

router.post("/update/:id", upload, async(req, res) =>{
  const id = req.params.id
  let new_image = ""

  if(req.file){
    new_image = req.file.filename
    try{
      fs.unlink("./uploads" + req.body.old_image)
    }catch(err){
      console.log(err.message)
    }
  }else{
    new_image = req.body.old_image
  }

  const result = await User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image : new_image
  })
  req.session.message ={
    type: "success",
    message: "User updated successfully"
  }
  res.redirect("/")
})


//delete user route
router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndRemove(id);
    if (result.image !== "") {
      try {
        fs.unlink("./uploads" + result.image);
      } catch (err) {
        console.log(err);
      }
    }
    req.session.message = {
      type: "info",
      message: "User deleted successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message });
  }
});
module.exports = router;
