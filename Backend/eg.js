const jwt = require("jsonwebtoken");

const user = { name: "John Doe", designation: "admin" };
const secretKey = "yourSecretKey";

// Generate JWT
const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

// Decode the JWT
const decoded = jwt.verify(token, secretKey); // Verify & decode

// Check user's name
if (decoded.name === "John Doe") console.log("Hello");
else console.log("Hi");

console.log("Generated JWT:", token);
