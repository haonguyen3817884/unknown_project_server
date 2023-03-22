const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const app = express();

require("dotenv").config();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.listen(process.env.PORT || 9000);