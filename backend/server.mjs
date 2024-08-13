import express from "express"
import fs from "fs";
import https from "https";
import posts from "./routes/posts.mjs";
import users from "./routes/users.mjs";
import cors from "cors"
import authMiddleware from "./middleware/authmiddleware.mjs";

const PORT = 3001;
const app = express()


const options = {
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem')
};

app.use(cors());
app.use(express.json())

app.use((reg, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

app.use('/post', posts)
app.route("/post", posts)
app.use('/user', users)
app.route("/user", users)

let server = https.createServer(options, app)
console.log("Server listing on: https://localhost:" + PORT);
server.listen(PORT)