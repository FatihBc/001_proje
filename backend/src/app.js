const express = require("express");
const cors = require("cors");

const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const locationRoutes = require("./routes/locationRoutes");
const researchRoutes = require("./routes/researchRoutes");
const doctorResearchRoutes = require("./routes/doctorResearchRoutes");
const departmentResearchRoutes = require("./routes/departmentResearchRoutes");
const locationResearchRoutes = require("./routes/locationResearchRoutes");
const departmentLocationRoutes = require("./routes/departmentLocationRoutes");
const metaRoutes = require("./routes/metaRoutes");
const departmentDoctorRoutes = require("./routes/departmentDoctorRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.post("/test", (req, res) => res.json({ ok: "direct POST works" }));

// API routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/doctor-research", doctorResearchRoutes);
app.use("/api/department-research", departmentResearchRoutes);
app.use("/api/location-research", locationResearchRoutes);
app.use("/api/department-location", departmentLocationRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/department-doctor", departmentDoctorRoutes);

module.exports = app;
