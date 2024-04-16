import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    throw new ApiError(400, "Please Provide All The Required Fields!");
  }
  const messageCreate = await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Message Sent Successfully", messageCreate));
});

export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  res
    .status(200)
    .json(new ApiResponse(200, "Messages Fetched Successfully", messages));
});
