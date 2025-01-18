const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routes
const userroute = require("./routes/Users");
const helloroute = require("./routes/Hello");
app.use("/users", userroute);
app.use("/hello", helloroute);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});