import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from "path";
import { dirname } from "path";
import bodyParser from "body-parser";
import { AdminRoute } from "./routes/admin.route.js";
import { subAdminRoute } from "./routes/subAdmin.route.js";
import { numberBoyRoute } from "./routes/numberBoy.route.js";
import { telecallerRoute } from "./routes/telecaller.route.js";
import cors from 'cors';

const app = express()

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  };
  app.use(cors(corsOptions));

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_NAME});

AdminRoute(app);
subAdminRoute(app);
numberBoyRoute(app);
telecallerRoute(app);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientDirectory = path.join(__dirname, "client");

console.log(clientDirectory)

app.use(express.static(clientDirectory));

app.get("/", (req, res) => {
    res.sendFile(path.join(clientDirectory, "adminLogin.html"));
});
app.get("/adminPanel", (req, res) => {
  res.sendFile(path.join(clientDirectory, "adminPanel.html"));
});
app.get("/numberboylogin", (req, res) => {
  res.sendFile(path.join(clientDirectory, "NumberBoyLogin.html"));
});
app.get("/numberboylogin/numberEntry", (req, res) => {
  res.sendFile(path.join(clientDirectory, "NumberEntry.html"));
});
app.get("/telecallerLogin", (req, res) => {
  res.sendFile(path.join(clientDirectory, "TeleCallerLogin.html"));
});
app.get("/telecallerLogin/telecallerEntry", (req, res) => { 
  res.sendFile(path.join(clientDirectory, "TeleCallerEntry.html"));
});

app.get("/telecallerLogin/telecallerEntry", (req, res) => { 
  res.sendFile(path.join(clientDirectory, "selectNumTele.html"));
});


app.get("/telecallerLogin/telecallerEntry", (req, res) => { 
  res.sendFile(path.join(clientDirectory, "subadminEdit.html"));
});

app.get("/telecallerLogin/telecallerEntry", (req, res) => { 
  res.sendFile(path.join(clientDirectory, "telecallerEdit.html"));
});

app.get("/telecallerLogin/telecallerEntry", (req, res) => { 
  res.sendFile(path.join(clientDirectory, "numberBoyEdit.html"));
});

app.listen(process.env.PORT, () =>{
    console.log(`App is running on - http://localhost:${process.env.PORT || 8080}`)
})