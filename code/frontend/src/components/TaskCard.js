import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import "../css/TaskCard.css"

const TaskCard = (props) => {
    const task = props.task;

    return (
        <div className={`TaskCard card-container ${task.priority}-priority`}>
            <div className="desc">
                <h2>
                    <Link to={`/show-task/`} state={{task}}>{task.title?.slice(0,50)}</Link>
                </h2>
                {task.due_date && <div>Due: {new Date(task.due_date).toLocaleDateString()}</div>}
                <p>{task.description?.slice(0, 50)}</p>
            </div>
        </div>
    );
};

export default TaskCard;