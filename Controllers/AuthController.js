const users = require("../Models/AuthModel");
const bcrypt = require("bcryptjs");

// Register User
exports.userRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new users({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(200).send("User Registered Successfully");
  } catch (error) {
    console.error("Error Registering User:", error);
    res.status(500).send("Error Registering User");
  }
};

// Login User
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await users.findOne({ email });
    if (!validUser) {
      return res.status(404).send("User Not Found");
    }

    const isMatch = await bcrypt.compare(password, validUser.password);
    if (!isMatch) {
      return res.status(401).send("Incorrect Password");
    }

    return res.status(200).send(validUser);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Login Failed");
  }
};
