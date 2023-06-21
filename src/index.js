// Import required modules
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// Import the routes file
const billRoutes = require("./routes/billRoutes");

// Create an Express application
const app = express();

// Swagger configuration options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Electronic Bill API",
      version: "1.0.0",
      description: "API documentation for electronic bills",
    },
  },
  apis: ["./src/routes/*.js"], // Update with the correct file path pattern to include all route files
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount the billRoutes middleware with the /api prefix
app.use("/api", billRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
