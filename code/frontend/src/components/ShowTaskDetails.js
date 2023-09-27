import React, { useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import "../css/ShowTaskDetails.css"
import api from "../helpers/api";

function ShowTaskDetails(props) {
    let { state } = useLocation();
    const [task, setTask] = useState(props.task || state.task);

    const navigate = useNavigate();

    const onDeleteClick = async (id) => {
        await api.deleteTask(id);
        navigate('/');
    };

    const TaskItem = (
        <div>
            <div className="row display-4 text-center">{task.title}</div>
            <br/>
            <div className="row">
                <div>Priority: {task.priority}</div>
                <div>Status: {task.status}</div>
                {task.due_date && <div>Due: {new Date(task.due_date).toDateString()}</div>}
            </div>
            <br/>
            <pre className="container">{task.description}</pre>
        </div>
    );

    return (
        <div className='ShowTaskDetails'>
            <div className='container'>
                <br/>
                <div className='col-md-6 m-auto float-end'>
                    <Link to='/tasks' className='btn btn-outline-warning float-left'>
                        Back
                    </Link>
                    <button
                        type='button'
                        className='btn btn-outline-danger'
                        onClick={() => {
                            onDeleteClick(task.id);
                        }}
                    >
                        Delete Task
                    </button>
                    {task.status != "complete" && <button
                        type='button'
                        className='btn btn-outline-primary'
                        onClick={async () => {
                            await api.updateTask({id: task.id, status: "complete"});
                            navigate('/');
                        }}
                    >
                        Mark Complete
                    </button>}
                    {task.status == "complete" && <button
                        type='button'
                        className='btn btn-outline-primary'
                        onClick={async () => {
                            await api.updateTask({id: task.id, status: "open"});
                            navigate('/');
                        }}
                    >
                        Mark Not Complete
                    </button>}
                    <Link
                        to={`/edit-task/`}
                        state={{task}}
                        className='btn btn-outline-info'
                    >
                        Edit Task
                    </Link>
                </div>
                <br/>
                <br/>
                <hr/>
                <div className='row'>
                    <br/>
                    <div className='col-md-10 m-auto'>{TaskItem}</div>
                </div>
            </div>
        </div>
    );
}

export default ShowTaskDetails;