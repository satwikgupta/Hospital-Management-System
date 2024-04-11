import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const patientRegister = new asyncHandler(async (req, res) => {
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

export const login = new asyncHandler(async (req, res) => {
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
    .json(new ApiResponse(200, "Login Successful", {user, token}));
});
