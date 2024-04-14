import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const patientRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    throw new ApiError(400, "Please Fill Full Form!");
  }

  const existed = await User.findOne({ email });

  if (existed) {
    throw new ApiError(400, "User already existed!");
  }

  const avatar = req.files.avatar[0].path;

  const avatarUrl = avatar && (await uploadOnCloudinary(avatar));

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
    avatar: {
      publicId: avatar ? avatarUrl.public_id : null,
      url: avatar ? avatarUrl.secure_url : null,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "User Created Successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "Please Fill Full Form!");
  }

  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch && user.role !== role) {
    throw new ApiError(400, "Invalid Credentials!");
  }

  const token = user.generateJsonWebToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  return res
    .status(200)
    .cookie(cookieName, token, options)
    .json(new ApiResponse(200, "Login Successful", { user, token }));
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const user = res.user;
  return res.status(200).json(new ApiResponse(200, "User Found", user));
});

export const logoutPatient = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now()),
  };

  return res
    .status(200)
    .cookie("patientToken", "", options)
    .json(new ApiResponse(200, "Logout Successful"));
});

// admin routes

export const addNewAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    throw new ApiError(400, "Please Fill Full Form!");
  }

  const existed = await User.findOne({ email });

  if (existed) {
    throw new ApiError(400, "Admin already existed!");
  }

  const avatar = req.files.avatar[0].path;

  const avatarUrl = avatar && (await uploadOnCloudinary(avatar));

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
    avatar: {
      publicId: avatar ? avatarUrl.public_id : null,
      url: avatar ? avatarUrl.secure_url : null,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Admin Registed Successfully", user));
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now()),
  };

  return res
    .status(200)
    .cookie("adminToken", "", options)
    .json(new ApiResponse(200, "Logout Successful"));
});

export const addNewDoctor = asyncHandler(async (req, res) => { 
  const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDept } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDept
  ){
    throw new ApiError(400, "Please Fill Full Form!");
  }

  const existed = await User.findOne({ email });

  if (existed) {
    throw new ApiError(400, "Doctor already existed!");
  }

  const avatar = req.files.avatar[0].path;
  if(!avatar){
    throw new ApiError(400, "Please Upload Doctor's Image!");
  }

  const avatarUrl = avatar && (await uploadOnCloudinary(avatar));
  if(!avatarUrl){
    throw new ApiError(400, "Something Went Wrong!");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    avatar: {
      publicId: avatar ? avatarUrl.public_id : null,
      url: avatar ? avatarUrl.secure_url : null,
    },
    doctorDept
  });
  return res.status(201).json(new ApiResponse(201, "Doctor Registed Successfully", user));
})

export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: "Doctor" });
  return res.status(200).json(new ApiResponse(200, "Doctors Found", doctors));
});