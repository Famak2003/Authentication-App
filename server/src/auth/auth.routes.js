import express from "express";
import { verifyUser } from "../middleware/auth.middleware.js";
import {AuthController} from "./auth.controller.js"
const app = express();

app.get("/", verifyUser, AuthController.login)
app.post('/register', AuthController.register)

export default app