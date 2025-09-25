const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./Router/userRouter");
const eventRoutes = require("./Router/eventRoutes");
const authRoutes = require("./Router/authRoutes");
const googleCalendarRoutes = require("./Router/googleCalendar");
const geminiRoutes = require("./Router/geminiRoutes");
const { dbConnection } = require("./Config/db");
// db connection
dbConnection();

app.use(cors()); // handling cors
app.use(express.json()); // handling body parse

//routes
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/auth/google", authRoutes);
app.use("/api/calendar", googleCalendarRoutes);
app.use("/api/gemini", geminiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}`);
});
