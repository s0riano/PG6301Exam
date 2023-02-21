import express from "express";

export function LoginApi(db){
    const api = express.Router();
    console.log("UserApi in action");

    api.get("/", async (req, res) => {

        const users = await db
            .collection("users")
            .find({})
            .map(({ username, password, department }) => ({ username, password, department }))
            .toArray();

        console.log(users);
        res.json(users)
    });

    api.post("/", (req, res) => {
        const{ username, password, department } = req.body;

        db.collection("users").insertOne({ username, password, department })

        res.sendStatus(204);
    });

    return api;
}

export function RequestUser(db){
    return async (req, res, next) =>  {
        const { username } = req.signedCookies;
        if(username) {
            const users = await db.collection("users").find().toArray();

            req.user = users.find((u) => u.username === username);
            req.role = users.find((u) => {
                if (u.username === username) {
                    return u.department;
                }
            });
        }
        next();
    };
}

