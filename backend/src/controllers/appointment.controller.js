import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";

export const postAppointment = asyncHandler(async (req, res) => {
  const { doctorId, symptoms, hasVisited } = req.body;
  if (!doctorId || !symptoms || !hasVisited) {
    throw new ApiError(400, "Please provide all the fields");
  }
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    symptoms,
    hasVisited,
  });
  return res
    .status(201)
    .json(
      new ApiResponse(201, "Appointment Created Successfully", appointment)
    );
});

export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient")
    .populate("doctor");

  return res
    .status(200)
    .json(new ApiResponse(200, "Appointments Fetched", appointments));
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }
  const { status } = req.body;

  appointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Appointment Status Updated", appointment));
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }
  await Appointment.findByIdAndDelete(id);
  return res.status(200).json(new ApiResponse(200, "Appointment Cancelled"));
});
