import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your firstname!"],
    minLength: [3, "Firstname must contain atleast 3 characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your lastname!"],
    minLength: [3, "Lastname must contain atleast 3 characters!"],
  },
  dob: {
    type: Date,
    required: [true, "Please enter your Date of Birth!"],
  },
  nic: {
    type: String,
    required: [true, "Please enter your NIC!"],
    minLength: [13, "NIC must contain atleast 13 characters!"],
    maxLength: [13, "NIC must contain atmost 13 characters!"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required!"],
    minLength: [10, "Phone number must contain atleast 10 characters!"],
    maxLength: [10, "Phone number must contain atmost 10 characters!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [8, "Password must contain atleast 6 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Please enter a valid email!"],
  },
  address: {
    type: String,
    minLength: [10, "Address must contain atleast 10 characters!"],
  },
  gender: {
    type: String,
    required: [true, "Please enter your gender!"],
    enum: ["Male", "Female", "Other"],
  },
  role: {
    type: String,
    required: [true, "User role is required!"],
    enum: ["Patient", "Admin", "Doctor"],
    default: "User",
  },
  avatar: {
    public_id: String,
    url: String,
  },
  doctorDept: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (pass) {
    
  return await bcrypt.compare(pass, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

export const User = mongoose.model("User", userSchema);
