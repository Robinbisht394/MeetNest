const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const log = require("./Middleware/logger");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./Router/userRouter");
const eventRoutes = require("./Router/eventRoutes");
const authRoutes = require("./Router/authRoutes");
const googleCalendarRoutes = require("./Router/googleCalendar");
const geminiRoutes = require("./Router/geminiRoutes");
const analyticsRoutes = require("./Router/analyticsRoutes");
const { dbConnection } = require("./Config/db");
// db connection
dbConnection();

app.use(cors()); // handling cors
app.use(express.json()); // handling body parse
app.use(log); //logging
// api limiter

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too Many request from this IP try again after 15 minutes",
});
app.use("/", apiLimiter);
//routes
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/auth/google", authRoutes);
app.use("/api/calendar", googleCalendarRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}`);
});
