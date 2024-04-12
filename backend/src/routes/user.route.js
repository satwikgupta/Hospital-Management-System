import express from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { patientRegister } from "../controllers/user.controller";

const router = express.Router();

router.post("/login", login);

router
  .route("/patient")
  .post(
    "/register",
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    patientRegister
  )
  .get("/me", isPatientAuthenticated, getUserDetails)
  .get("/logout", isPatientAuthenticated, logoutPatient);

router
  .route("/admin")
  .post("/addnew", isAdminAuthenticated, addNewAdmin)
  .get("/me", isAdminAuthenticated, getUserDetails)
  .get("/logout", isAdminAuthenticated, logoutAdmin);

router
  .route("/doctor")
  .post(
    "/addnew",
    isAdminAuthenticated,
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    addNewDoctor
  )
  .get(getAllDoctors);

export default router;
