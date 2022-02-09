import React, { useEffect, useState } from "react";
import Register from "./Register"
import Login from "./Login"


const Home = (s) => {

    const [state, setState] = useState({});
    useEffect(() => {
        setState(s.state);
    }, [s.state])

    const [view, setView] = useState(true)

    return (
        <div class="Home">
            <div class="bg" />
            <div class="userlogin">
                <div id="title">
                    <h1>{(view) ? "Login" : "Register"}</h1>
                </div >

                <div id="content">
                    {(view) ? <Login state={state} /> : <Register state={state} />}
                </div>

                <div id="select">
                    {(view) ? <span>Don't have an account? <span class={"button"} onClick={() => setView(false)}>Sign Up</span></span> : <span>Already have an account? <span class={"button"} onClick={() => setView(true)}>Log In</span></span>}
                </div>
            </div>
            <div class="title">
                <h1>u.id</h1>
                <h3>A blockchain-based identification system.</h3>
            </div>
        </div>
    );
}
export default Home;
