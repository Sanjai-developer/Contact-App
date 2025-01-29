const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const errorHandler = require("./middleware/errorHandler");
const timeout = require('connect-timeout');


connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(timeout('30s')); // Increase timeout limit to 30 seconds

// Middleware to handle timeout error
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use("/api/contacts",  require('./routes/contactRoutes'));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  if (req.timedout) {
    res.status(503).send('Service unavailable. Request timed out.');
  } else {
    errorHandler(err, req, res, next);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
