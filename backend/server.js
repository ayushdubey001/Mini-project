const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const feedbackRoutes = require('./routes/feedback'); // Import feedback route
const PORT = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Connect to Database
connectDB();


// API Routes
app.use("/api/auth", authRoutes);
app.use('/auth', authRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/api', feedbackRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



