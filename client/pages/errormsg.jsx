export function ErrorMsg(props) {
    return(
        <center>
            <div > {/*add css*/}
                {props.error.toString()}
                <div>
                    <button onClick={() => navigate("/")}>
                        BACK
                    </button>
                </div>
            </div>
        </center>
    )
}