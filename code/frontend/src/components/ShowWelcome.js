import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect} from "react";
import '../App.css';

function ShowWelcome() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.loggedIn)
            navigate('/tasks');
    }, [window.loggedIn]);

    return (
        <div className='ShowWelcome'>
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Welcome to Task Tracker</h2>
                    </div>

                    <div className='col-md-12'>
                        <br />
                        <hr />
                    </div>
                    <div className='col-md-12 text-center display-6'>
                        <div><Link to="/register">Sign Up!</Link></div>
                        <div><Link to="/login">Already Registered?</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowWelcome;