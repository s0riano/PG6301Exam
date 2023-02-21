import * as React from "react";
import {fetchJson} from "../func/http";
import {useLoader} from "../func/useLoader"

export function ListUsers(){
    const { loading, error, data } = useLoader(async () => {
        return fetchJson("/api/users");
    });

    console.log("loading: ", loading);
    console.log("error: ", error);
    console.log("data: ", data);

    if (loading) return <div>Loading...</div>

    if (error){
        return (
            <div>
                <h1>Error!</h1>
                <div> {error.toString()} </div>
            </div>
        );
    }

    if (Array.isArray(data)) {
        return (
            <div>
                <h1>Users:</h1>
                {data.map((user) => (
                    <div key={user.username}>
                        <h1> {user.username} -> {user.department}</h1>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h1>No user data available</h1>
            </div>
        );
    }
}