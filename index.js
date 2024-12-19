const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { dbConnection, dbDisconnect } = require("./db/config");
const path = require("path");
const { checkUserId } = require("./middleware/user");
require("dotenv").config();

//base de datos
dbConnection();

//crear app de express (server)
const app = express();

//habilitar directorio público
console.log(__dirname);
//app.use("/public", express.static(path.join(__dirname,"public")));
app.use(express.static("public"));

//lectura y parseo de body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //(B)
app.use(cors());
app.use(helmet());

// Custom middleware
app.use(checkUserId);

//rutas
app.use("/api/v1/tasks", require("./routes/tasks"));
app.use("/api/v1/payments", require("./routes/payments"));

const port = process.env.PORT || 8099;

//escuchar peticiones
app.listen(port, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${port}/`);
});

// This now works, and waits until the client is destroyed before exiting.
process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  dbDisconnect();
  console.log("db disconnected");
  process.exit(0);
});

process.once("SIGUSR2", async () => {
  console.log("(SIGUSR2) Shutting down...");
  dbDisconnect();
  console.log("db disconnected");
  process.exit(0);
});
//1
