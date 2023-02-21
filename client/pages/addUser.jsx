import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchJson} from "../func/http";

export function AddUser(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        console.log("trying to submit")

        await fetchJson("/api/users", {
            method: "post",
            json: { username, password, department }
        });

        setUsername("");
        setPassword("");
        setDepartment("");
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Create new Employee account</h1>
            <div>
                Name:
                <input value={username} onChange={(e) => setUsername(e.target.value.toLowerCase)}/>
            </div>
            <div>
                Password:
                <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                Department;
                <input value={department} onChange={(e) => setDepartment(e.target.value.toLowerCase)}/>
            </div>
            <button> Create </button>
        </form>
    )
}