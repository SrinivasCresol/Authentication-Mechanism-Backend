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
    const validateUser = await users.findOne({ email: email });

    if (validateUser) {
      const isMatch = await bcrypt.compare(password, validateUser.password);

      if (!isMatch) {
        res.status(422).json({ message: "Invalid Details" });
      } else {
        const token = await validateUser.generateAuthToken();
        res.cookie("userCookie", token, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
        });
        const result = { validateUser, token };
        res.status(200).json({ result, message: "Login Successful!" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Login Failed!" });
  }
};

//Logout User

exports.userLogout = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter(
      (item) => item.token !== req.token
    );
    await req.rootUser.save();

    res.clearCookie("userCookie", { path: "/login" });

    return res.status(200).json({ message: "Logout Successful!" });
  } catch (error) {
    console.error("User Logout Error:", error);
    return res.status(500).json({ message: "User Logout Failed!" });
  }
};