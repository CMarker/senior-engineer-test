import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import "../App.css";
import api from "../helpers/api";

function ShowRegister(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return setError("Invalid email address");
        if (!password) return setError("Missing password");
        if (!username) return setError("Missing username");

        const _user = await api.register(email, password, username);
        if (_user) {
            window.user = _user;
            window.loggedIn = true;
            navigate("/tasks", {
                state: {
                    _user
                }
            });
        } else {
            setError("Sign up failed - try again");
        }
    };

    return (
        <div className="ShowRegister">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2 className="display-4 text-center">Register</h2>
                    </div>

                    <div className="col-md-12">
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    <form onSubmit={handleSubmit}>
                        {error && <div>{error}</div>}
                        <div className="row"><input type="text" defaultValue={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)}/></div>
                        <div className="row"><input type="password" defaultValue={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}/></div>
                        <div className="row"><input type="text" defaultValue={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)}/></div>
                        <button className="float-end" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShowRegister;