// app.js
const express = require("express");
const { mongoose } = require("mongoose");
require("dotenv").config();
const exploredRouter = require("./router/userData.router.js");
const app = express();

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  exploredRouter(req, res, next);
});


const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

// Start server function
const startServer = async () => {
  await connectDB();
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  return server;
};
if (require.main === module) {
  startServer();
}

module.exports = { app, connectDB, startServer };
