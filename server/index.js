
require("dotenv").config();
const express = require("express");
var cors = require('cors')

const router = require("./router/router")

const app = express();
app.use(cors())

// MIDDLEWARE
app.use(express.static(__dirname + "/public"));
// Configurar express para procesar datos de formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());  // Para procesar JSON

app.use("/", router);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server listening on http://localhost:" + PORT);
})