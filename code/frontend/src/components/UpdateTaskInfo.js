import React, { useState, useEffect } from 'react';
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom';
import moment from "moment";
import api from "../helpers/api";
import '../App.css';
import "../css/UpdateTaskInfo.css"

function UpdateTaskInfo(props) {
    let { state } = useLocation();
    const [task, setTask] = useState(props.task || state?.task || {
        title: '',
        description: '',
    });
    const priorityTypes = ["Low", "Normal", "High", "Critical"];
    const statusTypes = ["Open", "Complete"];

    const navigate = useNavigate();

    useEffect(() => {
        if (!window.loggedIn)
            navigate("/");
    }, [])

    const onChange = (e) => {
        task[e.target.name] = e.target.value;
        if (e.target.name == "due_date")
            task[e.target.name] = moment(e.target.value).format();
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const _task = await api.updateTask(task);
        if (_task) {
            navigate(`/show-task/`, {
                state: {
                    task
                }
            });
        } else {
            console.log('Error in UpdateTaskInfo!');
        }
    };

    return (
        <div className='UpdateTaskInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <h1 className="display-4 text-center">Edit Task</h1>
                    </div>
                </div>
                <br/>

                <div className='col-md-8 m-auto'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                                <span>
                                    Priority:&nbsp;
                                    <select
                                        name="Priority"
                                        onChange={e => task.priority = e.target.value}
                                        defaultValue={task.priority}
                                    >
                                    {priorityTypes.map((_priorityType, key) => (
                                        <option key={key} value={_priorityType.toLowerCase()}>
                                            {_priorityType}
                                        </option>
                                    ))}
                                </select>
                                </span>

                            <span>
                                &nbsp;Status:&nbsp;
                                <select
                                    name="Status"
                                    onChange={e => task.status = e.target.value}
                                    defaultValue={task.status}
                                >
                                    {statusTypes.map((_statusType, key) => (
                                        <option key={key} value={_statusType.toLowerCase()}>
                                            {_statusType}
                                        </option>
                                    ))}
                                </select>
                            </span>

                            <span className="float-end">
                                    Due Date:&nbsp;
                                <input
                                    type='date'
                                    placeholder='Due Date'
                                    name='due_date'
                                    defaultValue={moment(task.due_date).format("YYYY-MM-DD")}
                                    onChange={onChange}
                                />
                                </span>
                        </div>
                        <br/>
                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='Title of the Task'
                                name='title'
                                className='form-control'
                                defaultValue={task.title}
                                onChange={onChange}
                            />
                        </div>
                        <br />

                        <div className='form-group'>
                            <textarea
                                type='text'
                                placeholder='Description of the Task'
                                name='description'
                                className='form-control'
                                defaultValue={task.description}
                                onChange={onChange}
                            />
                        </div>
                        <br />

                        <div className="float-end">
                            <Link to='/show-task/' className='btn btn-outline-warning float-left' state={{task}}>Cancel</Link>
                            <button type='submit' className='btn btn-outline-info'>Update Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateTaskInfo;