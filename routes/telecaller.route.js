import { TelecallerController } from "../controller/telecaller.controller.js";
import { telecaller } from "../models/telecaller.models.js";

export const telecallerRoute = (app) => {
    app.post("/api/telecaller-login", async (req, res) => {
        try {
            const { userName, password } = req.body;
            const Telecaller = await telecaller.findOne({ userName: userName });
            console.log("telecallernnn", Telecaller)
            const accessToken = await TelecallerController.generateTelecallerAccessToken(userName, password);
            console.log(accessToken);
            if (Telecaller && accessToken) {
                res.status(200).send({ code: 200, message: "login is sucessfull" })
            } else {
                res.status(404).json({ code: 404, message: "INvalid Credential" })

            }

        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    }) 

}