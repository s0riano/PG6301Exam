import React, {useState} from "react";
import {FrontPage} from "./pages/frontpage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ListUsers} from "./pages/listUsers";
import {AddUser} from "./pages/addUser";




function Users(){
    return(
        <Routes>
            <Route path={"/list"} element={<ListUsers />} />
            <Route path={"/new"} element={<AddUser />} />
        </Routes>
    );
}


export function App() {
    const [error, setError] = useState();
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<FrontPage setError={setError}/>}/>
                    <Route path={"/users/*"} element={<Users />}/>
                    <Route path={"/users/new"} element={<AddUser />} />
                    <Route path={"/users/list"} element={<ListUsers />} />
                </Routes>
            </BrowserRouter>
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </>
    );
}

