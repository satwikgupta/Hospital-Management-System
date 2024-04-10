import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./database/connectionDB.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
      console.log("MongoDB connected successfully");
    });
  })
  .catch((error) => {
    console.log("Server failed to start due to error: " + error);
  });
