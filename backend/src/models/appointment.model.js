import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

}, { timestamps: true });

appointmentSchema.plugin(mongooseAggregatePaginate);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
