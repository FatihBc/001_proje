const express = require("express");
const cors = require("cors");
const doctorRoutes = require("./routes/doctorRoutes");
const metaRoutes = require("./routes/metaRoutes");
const researchRoutes = require("./routes/researchRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api", doctorRoutes);
app.use("/api", metaRoutes);
app.use("/api", researchRoutes);

app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

module.exports = app;
