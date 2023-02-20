import {useNavigate} from "react-router-dom";
import {fetchJson} from "../func/http";
import {ErrorMsg} from "./errormsg";


export function FrontPage({ setError }) {
    const navigate = useNavigate();

    const {loading, error, data, reload } = useLoader(
        async () => await fetchJson("api/login")
    );
    const user = data;

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <ErrorMsg error={error} />
    }
    console.log(user);
    return(
        <div>
            <h1>Payroll</h1>
            { user ? (
                user.role == "client" ?(
                    <LoggedInnUser user={user} reload={reload} serError={setError} />
                ) : (
                    <LoggedInnEmployee users={user} reload={reload} serError={setError} />
                )) : (
                    <NotLoggedInnUser setError={setError}/>
            )}
        </div>
    );
}
