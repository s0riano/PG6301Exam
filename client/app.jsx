import React, {useState} from "react";
import {FrontPage} from "./pages/frontpage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {fetchJson} from "./func/http";


function AddUser(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        await fetchJson("/api/users", {
            method: "post",
            json: {username, password, department}
        });

        setUsername("")
        setPassword("")
        setDepartment("")
    }

    return(
        <from onSubmit={handleSubmit}>
            <h1>Create new Employee</h1>
            <div>
                Name:
                <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                Password:
                <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                Department;
                <input value={department} onChange={(e) => setDepartment(e.target.value)}/>
            </div>
            <button>Create</button>
        </from>
    )
}


export function App() {
    const [error, setError] = useState();
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<FrontPage setError={setError} />} />
                    <Route path={"/new"} element={<AddUser/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

