const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const HttpError = require("./middlewares/httpError");
const contentRoutes = require("./routes/contentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const messageTypes = require("./utils/messageTypes");

dotenv.config();
const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express();
// app.use("/",(req,res)=>{
//   console.log(`server is running at ${PORT}`);
//   // res.send("Server is running");


// })
const corsOptions = {
  origin: ['https://today-q-contentoffer-frontend.vercel.app'],
  methods : ["POST", "GET"],
  credentials:true
};
app.use(cors());
app.use(express.json());

app.use("/api/content", contentRoutes);
app.use("/api/order", orderRoutes);

app.use((req, res) => {
  throw new HttpError("could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    console.log(res.headerSent);
    return next(error);
  }
  res.status(error.status || 500);
  res.json({
    messageType: messageTypes.FAIL,
    message: error.message,
    status: error.status || "An unknown error occured",
  });
});

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Started on port ${PORT}, and database connected`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
