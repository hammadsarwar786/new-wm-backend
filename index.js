const express = require("express");
const db = require("./db/config");
const route = require("./controllers/route");
const updatedRoute = require("./controllers/updatedRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const fs = require("fs");
const path = require("path");

//Setup Express App
const app = express();
// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Set up CORS 
// Naimat Ullah
app.use(cors());
//API Routes
app.use("/api", route);
// Updated routes
app.use("/api/v2", updatedRoute);

app.get("/", async (req, res) => {
	res.send("Welcome to my world...");
});

// Get port from environment and store in Express.
// Naimat
const server = app.listen(port, () => {
	const protocol =
		process.env.HTTPS === "true" || process.env.NODE_ENV === "production"
			? "https"
			: "http";
	const { address, port } = server.address();
	const host = address === "::" ? "127.0.0.1" : address;
	console.log(`Server listening at ${protocol}://${host}:${port}`);
});

// Connect to MongoDB
console.log(process.env.DB_URL, "url of db");
const DATABASE_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const DATABASE = process.env.DB || "crm";

db(DATABASE_URL, DATABASE);
