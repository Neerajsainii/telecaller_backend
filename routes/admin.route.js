import { AdminController } from "../controller/admin.controller.js";
import { subAdminController } from "../controller/subAdmin.controller.js";
import { numberBoyController } from "../controller/numberBoy.controller.js";
import { TelecallerController } from "../controller/telecaller.controller.js";
import { Admin } from "../models/admin.models.js";
import { subAdmin } from "../models/subadmin.models.js";
import { numberBoy } from "../models/numberBoy.models.js";
import { telecaller } from "../models/telecaller.models.js";
export const AdminRoute = (app) => {
    app.post("/api/admin-create", async (req, res) => {
        try {
            const { userName, password } = req.body;
            const admin = await AdminController.createAdmin({ userName, password });
            res.status(200).send({ code: 200, message: "registesdfsgsr is sucessfull" })
        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    })
    app.post("/api/admin-login", async (req, res) => {
        try {
            const { userName, password } = req.body;
            const admin = await Admin.findOne({ userName: userName });
            console.log("adminnnn", admin)
            const accessToken = await AdminController.generateAdminAccessToken(userName, password);
            console.log(accessToken);
            if (admin && accessToken) {
                res.status(200).send({ code: 200, message: "login is sucessfull" })
            } else {
                res.status(404).json({ code: 404, message: "INvalid Credential" })

            }

        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    })
    app.post("/api/admin/subadmin-create", async (req, res) => {
        try {
            const { userName, password } = req.body;
            const subadmin = await subAdminController.createsubAdmin({ userName, password });
            res.status(200).send({ code: 200, message: "register is sucessfull" })
        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    })
    app.get("/api/admin/view-subadmin", async(req, res)=>{
        try
        {
            const subadmin = await subAdmin.find({}, "-password")
            res.status(200).json(subadmin);
        }
        catch(err)
        {
            res.status(500).send({code: err.code, message: err.message})
        }
    })
    app.post("/api/admin/numberBoy-create", async (req, res) => {
        try {
            const { userName, password } = req.body;
            const numberboy = await numberBoyController.createnumberBoy({ userName, password });
            res.status(200).send({ code: 200, message: "register is sucessfull" })
        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    })
    app.get("/api/admin/view-numberBoy", async(req, res)=>{
        try
        {
            const numberboy = await numberBoy.find({}, "-password")
            res.status(200).json(numberboy);
        }

        catch(err)
        {
            res.status(500).send({code: err.code, message: err.message})
        }
    })
    
    
    app.post("/api/admin/telecaller-create", async (req, res) => {
        try {
            const { userName, password } = req.body;
            const Telecaller = await TelecallerController.createTelecaller({ userName, password });
            res.status(200).send({ code: 200, message: "register is sucessfull" })
        } catch (err) {
            res.status(500).send({ code: err.code, message: err.message })
        }
    })
    app.get("/api/admin/view-telecaller", async(req, res)=>{
        try
        {
            const Telecaller = await telecaller.find({}, "-password")
            res.status(200).json(Telecaller);
        }
        catch(err)
        {
            res.status(500).send({code: err.code, message: err.message})
        }
    })
    

}