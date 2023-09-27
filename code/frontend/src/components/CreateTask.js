import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from "moment";
import api from "../helpers/api";

import '../App.css';
import "../css/CreateTask.css"

const CreateTask = (props) => {
    // Define the state with useState hook
    const navigate = useNavigate();
    const [task, setTask] = useState({title: '', description: '', priority: 'normal'});
    const [error, setError] = useState("");

    const priorityTypes = ["Low", "Normal", "High", "Critical"];

    const onChange = (e) => {
        task[e.target.name] = e.target.value;
        if (e.target.name == "due_date")
            task[e.target.name] = moment(e.target.value).format();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!task.title) return setError("Missing Title!");
        if (!task.description) return setError("Missing Description!");

        const newTask = await api.addTask(task);
        if (newTask) {
            navigate('/');
        } else {
            setError('Error creating task');
        }
    };

    return (
        <div className='CreateTask'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Add Task</h1>
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

                                <span className="float-end">
                                    Due Date:&nbsp;
                                    <input
                                        type='date'
                                        placeholder='Due Date'
                                        name='due_date'
                                        defaultValue={task.due_date}
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
                                    placeholder='Describe this task'
                                    name='description'
                                    className='form-control'
                                    defaultValue={task.description}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="float-end">
                                {error && <span>{error}</span>}
                                <input type='submit' className='btn btn-outline-primary' value="Create"/>
                                <Link to='/' className='btn btn-outline-secondary'>Cancel</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;