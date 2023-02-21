import {Link} from "react-router-dom";
import { fetchJson } from "../func/http";
import {LoggedInnUser} from "./loggedInnUser";



export function FrontPage({ setError } ) {
    const { loading, error, data, reload } = useLoader(
        async () => await fetchJson("/api/login")
    );
    const user = data;

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error!</div>;
    }
    console.log(user);
    return (
        <div>
            <h1>Modern Snack</h1>

            {user ? (
                user.role == "client" ? (
                    <LoggedInnUser user={user} reload={reload} setError={setError} />
                ) : (
                    <LoggedInnEmployee user={user} reload={reload} setError={setError} />
                )
            ) : (
                <NotLoggedInnUsers setError={setError} />
            )}
            <div></div>
        </div>
    );


    /*return(
        <div>
            <h1> Payroll </h1>
            <ul>
                <li>
                    <Link to={"/users/list"}> List Users </Link>
                </li>
                <li>
                    <Link to={"/users/new"}> Add new Employee </Link>
                </li>
            </ul>
        </div>
    );*/
}
