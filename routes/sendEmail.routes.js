const router = require("express").Router();
const Email = require("../services/transporterEmail.js")
router.route("/send-email").post(async (req, res) => {
    try {
        const { subject, text, to } = req.body;

        // Verificar si se proporcionan todos los campos necesarios
        if (!subject || !text || !to) {
            return res
                .status(400)
                .json({ error: "Faltan campos obligatorios." });
        }

        // Opciones del correo electrónico
        const emailOptions = {
            subject,
            text,
            to: process.env.EMAIL,
            from,
        };

        // Enviar el correo electrónico
        await Email.sendEmail(emailOptions);

        res.status(200).json({
            message: "Correo electrónico enviado exitosamente.",
        });
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        res.status(500).json({
            error: "Error al enviar el correo electrónico.",
        });
    }
});
module.exports = router;