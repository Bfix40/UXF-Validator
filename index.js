const express = require("express");
const app = express();
const cors = require("cors");
const contactRouter = require("./routes/contact.routes.js");
require("dotenv").config();
app.use(cors());
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", contactRouter);
// Validaciones y sanitizaciones para el endpoint /contact
app.get("/", (req, res) => {
    res.status(200).json({ message: "Contact service online" });
});


// Iniciar el servidor en el puerto 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`App running at ${process.env.PORT}`);
});
