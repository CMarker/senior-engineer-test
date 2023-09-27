import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../helpers/api";

import "../App.css";

function ShowLogin(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return setError("Invalid email address");
        if (!password) return setError("Missing password");

        const _user = await api.login(email, password);
        if (_user) {
            window.user = _user;
            window.loggedIn = true;
            navigate("/tasks", {
                state: {
                    _user
                }
            });
        } else {
            setError("Login failed - try again");
        }
    };

    return (
        <div className="ShowLogin">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">Login</h2>
                    </div>

                    <div className="col-md-12">
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="col-md-12">
                    {error && <div>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row"><input type="text" defaultValue={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)}/></div>
                        <div className="row"><input type="password" defaultValue={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}/></div>
                        <button className="float-end" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShowLogin;