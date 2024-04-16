import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";

export const postAppointment = asyncHandler(async (req, res) => {
  const { doctorId, symptoms, hasVisited } = req.body;
  console.log("req body", req.body);

  if (!doctorId || !symptoms) {
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
      new ApiResponse(201, appointment, "Appointment Created Successfully")
    );
});

export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "patientId",
        foreignField: "_id",
        as: "patient",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              dob: 1,
              age: 1,
              gender: 1,
              phone: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
              dob: 1,
              phone: 1,
              email: 1,
              gender: 1,

              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        symptoms: 1,
        hasVisited: 1,
        createdAt: 1,
        updatedAt: 1,
        patient: 1,
        doctor: 1,
      },
    },
  ]);

  if (!appointments) {
    throw new ApiError(404, "No appointments found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, appointments, "Appointments Fetched"));
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    { hasVisited: !appointment.hasVisited },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedAppointment, "Appointment Status Updated")
    );
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }
  await Appointment.findByIdAndDelete(id);
  return res.status(200).json(new ApiResponse(200,[], "Appointment Cancelled"));
});
