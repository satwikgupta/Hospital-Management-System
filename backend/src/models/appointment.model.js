import mongoose from "mongoose";
import { type } from "os";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symptoms: {
    type: String,
    required: true
  },
  hasVisited: {
    type: Boolean,
    default: false
  }

}, {timestamps: true});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
