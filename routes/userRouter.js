const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleweares/authanticate");

/*
    @usage : to Register a User
    @url : /api/users/register
    @fields : name ,email ,phone, password
    @method : POST
    @access : PUBLIC
 */

router.post(
  "/register",
  async (request, response) => {
    try {
      let { name, email, phone, password } = request.body;
      // check if the user exits
      let user = await User.findOne({ email: email });

      if (user) {
        return response.status(201).json({ msg: "Email already Exists" });
      }
      let salt = await bcrypt.genSalt(10); // salt is actually encrypted password
      password = await bcrypt.hash(password, salt); //password=salt
      let isAdmin = false;
      if (email === "abhishek82904@gmail.com") isAdmin = true;
      user = new User({ name, email, phone, password, isAdmin });
      await user.save();
      response.status(200).json({ msg: "Registration is Successful" });

    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  });
/*
@usage : to Login a User
@url : /api/users/login
@fields : email , password
@method : POST
@access : PUBLIC
*/
router.post(
  "/login",

  async (request, response) => {
    try {
      let { email, password } = request.body;

      // check if the correct email
      let user = await User.findOne({ email: email });
      if (!user) {
        return response
          .status(201)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // check the passwords
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response
          .status(201)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      let payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(payload, process.env.JWT_SECRET_KEY, (error, token) => {
        if (error) throw error;
        response.status(200).json({
          msg: "Login is Success",
          token: token,
          email: email,
        });
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);
router.get("/me", authenticate, async (request, response) => {
  try {
    let user = await User.findById(request.user.id).select("-password");
    response.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});
module.exports = router;