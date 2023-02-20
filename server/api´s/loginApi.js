import express from "express";

export const LoginApi = express.Router();

const users = [
    {
        username: "admin",
    },
    {
        password: "password"
    }
]

LoginApi.get("/", (req, res) =>{
    res.json(users)
})

LoginApi.post

/*
export function loginApi(){

}*/
