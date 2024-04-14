import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const isPatientAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.patientToken || req.headers.authorization?.split(" ")[1];

    if (!token) throw new ApiError(401, "Please authenticate");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (req.user.role !== "Patient")
      throw new ApiError(403, "You have no access to this resource !");

    next();
  } catch (error) {
    console.log("Error while login: ", error);
  }
});

export const isAdminAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.adminToken || req.headers.authorization?.split(" ")[1];

    if (!token) throw new ApiError(401, "Please authenticate");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (req.user.role !== "Admin")
      throw new ApiError(403, "You have no access to this resource !");

    next();
  } catch (error) {
    console.log("Error while login: ", error);
  }
});

export const isAuthenticated = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "You have no access to this resource !"));
    }

    next();
  });
