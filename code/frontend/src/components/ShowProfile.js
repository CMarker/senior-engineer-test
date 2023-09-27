import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../helpers/api";

import '../App.css';
import '../css/ShowProfile.css';

function ShowProfile(props) {
    let { state } = useLocation();
    state = state || {};
    const navigate = useNavigate();

    const [user, setUser] = useState(props.user || state.user || {});
    const [shouldEdit, setShouldEdit] = useState(false);

    useEffect(() => {
        async function getProfile() {
            const _user = await api.me();
            if (_user) {
                window.loggedIn = true;
                setUser(_user);
                window.user = _user;
            } else {
                navigate('/');
            }
        }
        getProfile();
    }, []);

    useEffect(() => {
        if (!state.user)
            navigate('/');
    }, [state.user]);

    async function handleClickedSave(e) {
        setShouldEdit(false);

        const _user = await api.updateUser(user);
    }

    return (
        <div className='ShowProfile'>
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='display-4 text-center'>Profile</h2>
                    </div>

                    <div className='col-md-12'>
                        <div className="float-end">
                            {!shouldEdit && <button className='btn btn-outline-warning float-end' onClick={() => setShouldEdit(true)}>Edit</button>}
                        </div>
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    {user.avatar && <div><img className="rounded-circle shadow-4-strong" src={user.avatar}/></div>}
                    {shouldEdit && <div>Avatar: <input defaultValue={user.avatar} onChange={(e) => user.avatar = e.target.value}/></div>}
                    <br/>
                    <div>Username:&nbsp;
                        {!shouldEdit && user.username}
                        {shouldEdit && <input defaultValue={user.username} onChange={(e) => user.username = e.target.value}/>}
                    </div>
                    <div>Email:&nbsp;
                        {!shouldEdit && user.email}
                        {shouldEdit && <input defaultValue={user.email} onChange={(e) => user.email = e.target.value}/>}
                    </div>
                    <div className="row float-end">
                        {shouldEdit && <button onClick={handleClickedSave}>Done</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProfile;