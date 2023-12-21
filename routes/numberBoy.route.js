import { numberBoyController } from "../controller/numberBoy.controller.js";
import { numberBoy } from "../models/numberBoy.models.js";


export const numberBoyRoute = (app) => {
    app.post("/api/numberBoy-login", async (req, res) => {
        try {
            const { userName, password } = req.body;
            const numberboy = await numberBoy.findOne({ userName: userName });
            console.log("adminnnn", numberBoy)
            const accessToken = await numberBoyController.generatenumberBoyAccessToken(userName, password);
            console.log(accessToken);
            if (numberboy && accessToken) {
                res.status(200).send({ code: 200, message: "login is sucessfull" })
            } else {
                res.status(404).json({ code: 404, message: "INvalid Credential" })

            }

        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    }) 

    app.post("/api/newNumber", async (req, res) => {
        try {
            const { freshnewNum, newRemark} = req.body;
            const newNum = await numberBoyController.createnewnum(freshnewNum, newRemark);
            console.log("numrssss", newNum)
            if (newNum) {
                res.status(200).send({ code: 200, message: "numberreg is sucessfull" })
            }
        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    })
    app.post("/api/oldNumber", async (req, res) => {
        try {
            const { fresholdNum, oldRemark } = req.body;
            const oldNum = await numberBoyController.createoldnum(fresholdNum,oldRemark);
            console.log("numberssss", oldNum)
            if (oldNum) {
                res.status(200).send({ code: 200, message: "numberreg is sucessfull" })
            }
        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    })
}
