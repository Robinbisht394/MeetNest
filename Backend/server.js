const express = require("express");
const app = express();
const userRoutes = require("./Router/userRouter");
const eventRoutes = require("./Router/eventRoutes");
const { dbConnection } = require("./Config/db");
const cors = require("cors");
require("dotenv").config();
dbConnection();
app.use(cors());
app.use(express.json());
//routes
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
