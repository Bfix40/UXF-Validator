const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Validaciones y sanitizaciones para el endpoint /contact
app.post(
    "/contact",
    body("name")
        .trim()
        .escape()
        .matches(/^[a-zA-Z ]+$/)
        .withMessage("El nombre solo puede contener letras y espacios"),
    body("email")
        .trim()
        .escape()
        .isEmail()
        .withMessage("El email debe tener un formato válido"),
    body("interests")
        .isArray({ min: 1 })
        .withMessage("Debe seleccionar al menos un interés"),
    body("budget")
        .isIn(["< 1k", "2k-4k", "5k-10k", "10k-20k", "20k-40k", "50k+"])
        .withMessage("Debe seleccionar un presupuesto válido"),
    body("projectDescription")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("La descripción del proyecto es obligatoria"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Si no hay errores de validación, se procesa la solicitud
        // Aquí puedes acceder a los datos enviados en el cuerpo de la solicitud mediante req.body
        res.send("¡Solicitud de contacto recibida correctamente!");
    }
);

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log(`App running at http://localhost:3000`);
});