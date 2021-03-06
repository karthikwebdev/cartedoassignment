//import all packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const connectDB = require("./config/db");
//import all routers
const userRouter = require("./routes/user");
const blockRouter = require("./routes/block");

//middlewares
//configure .env file
require("dotenv").config();
//connect to database
connectDB();
//initialize express app
const app = express();
// body parser middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// delimit cors
app.use(cors());
// add logger middleware
app.use(morgan("dev"));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Cartedo Challenge REST Apis",
      version: "1.0.0",
      description:
        "RESTful APIs for Demonstration of How blockchain works  as a part of Cartedo Challenge",
      contact: {
        name: "Karthik Enumarthi",
      },
      servers: ["https://cartedo-challenge.herokuapp.com"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", userRouter);
app.use("/api", blockRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// 404 page
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Page Not Found",
  });
});

//set port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});
