const mongoose = require("mongoose");
const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, secretKey, {
      expiresIn: "300s",
    });

    this.tokens.push({ token });
    await this.save();

    return token;
  } catch (error) {
    throw new Error("Token generation error");
  }
};

const users = new mongoose.model("users", userSchema);

module.exports = users;
