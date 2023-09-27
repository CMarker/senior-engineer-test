import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../helpers/api';
import '../App.css';
import '../css/Header.css';

function Header(props) {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(window.loggedIn);
    const [user, setUser] = useState(window.user);

    useEffect(() => {
        async function checkLogin() {
            const _user = await api.me();
            if (_user) {
                setLoggedIn(true);
                window.loggedIn = true;
                setUser(_user);
                window.user = _user;
                navigate('/tasks', {
                    state: {
                        _user
                    }
                });
            }
        }

        checkLogin();
    }, []);

    return (
        <div className='Header'>
            <div className="float-end">
                <span><Link to="/">Home</Link></span>
                {!window.loggedIn && <span><Link to="/register">Register</Link></span>}
                {!window.loggedIn && <span><Link to="/login">Login</Link></span>}
                {window.loggedIn && <span><Link to="/profile" state={{user}}>Profile</Link></span>}
                {window.loggedIn && <span><Link to="/logout">Sign Out</Link></span>}
            </div>
        </div>
    );
}

export default Header;