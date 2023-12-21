import { subAdminController } from "../controller/subAdmin.controller.js";
import { subAdmin } from "../models/subadmin.models.js";

export const subAdminRoute = (app) =>{
app.post("/api/subadmin-login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const subadmin = await subAdmin.findOne({ userName: userName });
        console.log("adminnnn", subadmin)
        const accessToken = await subAdminController.generatesubAdminAccessToken(userName, password);
        console.log(accessToken);
        if (subadmin && accessToken) {
            res.status(200).send({ code: 200, message: "login is sucessfull" })
        } else {
            res.status(404).json({ code: 404, message: "INvalid Credential" })

        }

    } catch (err) {
        res.status(500).send({ code: err.code, message: err.message })
    }
})
}