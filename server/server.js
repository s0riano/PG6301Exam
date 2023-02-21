import express from 'express';
import bodyParser from "body-parser";
import {LoginApi, RequestUser} from "./api´s/userApi.js";
import * as path from "path";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.static("../client/dist"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
/*app.use("/api/loginApi", UserApi);*/

//DATABASE -----------------------------------------------------------
const mongodbUrl = process.env.MONGODB_URL;

if (mongodbUrl) {
    const client = new MongoClient(mongodbUrl);

    client
        .connect()
        .then(async (conn) => {

            app.use(RequestUser(client.db("time-management")));

            app.use("/api/users",
                LoginApi(conn.db(process.env.MONGODB_DATABASE || "time-management")));
            console.log("connected to MONGOLOID");
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
}else {
    console.error('MongoDB URL is not defined in the environment variables');
}

app.use((req,res,next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        return res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
})



const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});