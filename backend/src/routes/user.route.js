import express from "express";
import { upload } from "../middlewares/multer.middleware.js";

import {
  patientRegister,
  login,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  register,
} from "../controllers/user.controller.js";

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  register
);
router.post(
  "/admin/addnew",
  isAdminAuthenticated,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  register
);
router.post(
  "/doctor/addnew",
  isAdminAuthenticated,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  addNewDoctor
);
router.get("/doctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
