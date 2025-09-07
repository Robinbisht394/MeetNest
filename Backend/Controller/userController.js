const { use } = require("react");
const userModel = require("../Model/userModel");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/token");

const signup = async (req, res) => {
  console.log("body", req.body);

  const { name, email, password, role, company } = req.body;
  try {
    //  check if user already signup
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already signup" });
    }

    //  hashing the  user password
    const hashed = await hashPassword(password);

    // create a new user

    const newUser = new userModel({
      name,
      email,
      password: hashed,
      role,
      company: company || "",
    });
    await newUser.save();
    // generate token
    const { accesToken, refreshToken } = generateToken(newUser._id);

    const user = newUser.toObject();
    user.token = accesToken;
    delete user.password;
    res.status(201).json({ user: user, message: "user signup successfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exist
    let user = await userModel.findOne({ email });
    console.log(user.password);

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    // match password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res.status(404).json({ message: "Invalid credentials" });

    // generate token while login
    const { accesToken, refreshToken } = generateToken(user._id);
    user = user.toObject();
    user.token = accesToken;
    delete user.password;

    res.status(200).json({ user: user, message: "login successfull" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };
