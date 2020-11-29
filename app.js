require('dotenv').config();
const express = require('express');
const db = require("./db");
const app = express();

app.use(require('./middleware/headers'));

const controllers = require('./controller');

app.use(express.json());

app.use("/user", controllers.usercontroller);

app.use("/log", controllers.logcontroller);

db.authenticate()
.then(() => db.sync()) // => {force: true}
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Sever: ] Server Crashed");
    console.error(err);
})
