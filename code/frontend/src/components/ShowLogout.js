import React, {useEffect} from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom';
import api from "../helpers/api";

function ShowLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        async function doLogout() {
            await api.logout();
            navigate('/');
            window.user = null;
            window.loggedIn = false;
        }

        doLogout();
    }, []);

    return (
        <div className='ShowLogout'>
            <div>Logging out...</div>
        </div>
    );
}

export default ShowLogout;