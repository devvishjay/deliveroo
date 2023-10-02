const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const socketIo = require('socket.io');
const http = require('http');

const app = express();

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
const server = http.createServer(app);

const io = socketIo(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

//DB Connection
require('./src/db/connection.js')

app.use(fileUpload());
require("dotenv").config();

app.use(
  cors({
    origin: [],
    optionsSuccessStatus: 200,
  })
);

const user = require("./routes/userRoute.js");
const customer = require("./routes/customerRoute.js");
const restaurant = require("./routes/restaurantRoute.js");
const menu = require("./routes/menuRoute.js");
const order = require("./routes/orderRoute.js");


app.use("/api/users", user);
app.use("/api/customers", customer);
app.use("/api/restaurants", restaurant);
app.use("/api/menus", menu);
app.use("/api/orders", order);

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

app.listen(port, () => {
  console.log(`Process ${process.pid}, ${port} ${process.env.NODE_ENV}`);
});
