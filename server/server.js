const express = require("express");
const mongoose = require("mongoose");
const test_routes = require("./routes/testRoute");
const cors = require('cors');
// import all my routes 
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const matchRoutes = require("./routes/matchRoutes");
const avaliabilityRoutes = require("./routes/avaliabilityRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const participationRoutes = require("./routes/participationRoutes");

require("dotenv").config(); 
mongoose.connect(process.env.MONGO_URI);
const app = express();
app.use(cors({
    origin: "*",  
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // Include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
app.use(express.static("../public"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/tests", test_routes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/matches", matchRoutes);
app.use("/avaliablities", avaliabilityRoutes);
app.use("/sessions", sessionRoutes);
app.use("/participents", participationRoutes);

app.listen(8080, ()=> {
    console.log("server running on port 8080");
});

module.exports = app;