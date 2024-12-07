import express from 'express';
// import mysql from 'mysql';
import mysql from 'mysql2'
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import ip from 'ip'
import logger from './utils/logger.js'

//password hashing
const  salt = 10;


dotenv.config()
const PORT = process.env.SERVER_PORT || 3000;
//initialze app
const app = express();

//middleWears
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser())

const verifyUser = (req, res, next) => {
    const token = req.cookies.token; 
    if (!token){ // Checks is there is a token form the browser
        return res.json({Error: "You are Not authorised"})
    }else{ // Checks if there token is the one created by this app
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err){
                return res.json({Error: "Token not found your not a registered user"})
            } else {
                req.name = decoded.name
                next();
            }
        })
    }
}

//db connection
// const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database!');
  });

// =========== routes =========== //

app.get("/", verifyUser, (req, res) =>{ // verifies if user is logged in or not
    return res.json({status: "success", name: req.name})
})

app.post('/register', (req, res)=> {
    const QUERY = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";

    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ Error: "Missing required fields" });
    }

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) =>{
        if (err) {
            console.error("Hashing error:", err);
            return res.json({Error: "Error when hashing password"})
        }
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(QUERY, [values], (err, result)=> {
            if(err){
                return res.json({Error: `Database Error ===> ${err}`});
            }
            return res.status(200).json({ status: "Success" });
        })
    })
    
})

app.post('/login', (req, res) => {
    const QUERY = "SELECT * FROM login WHERE email = ?";
    db.query(QUERY, [req.body.email], (err, data) => {
        if (err){
            return res.json({err})
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.status(400).json({Error: 'Password compare error'})
                }
                if (response) {
                    console.log("successfully found user on database")
                    const name = data[0].name;
                    const  token = jwt.sign({name}, process.env.JWT_SECRET, {expiresIn: '1d'})
                     res.cookie("token", token)
                    return res.json({status: 'success'})
                }else{
                    return res.json({Error: "Password not matched"})
                }
            })
        } else{
            return res.json({Error: "User not found in the database"})
        }
    })
})

app.get('/logout',(req, res) => {
    res.clearCookie('token'); // delete token from the browser
    return res.json({status: "success"})
})

app.listen(PORT, ()=> {
    logger.info(`Server running on: ${ip.address()}:${PORT}`);
})
