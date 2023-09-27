import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from "../helpers/api";
import TaskCard from './TaskCard';
import '../App.css';
import "../css/ShowTaskList.css";

const priorityMap = {
    "low": 0,
    "normal": 1,
    "high": 2,
    "critical": 3
}

function ShowTaskList(props) {
    const navigate = useNavigate();

    const [filteredTasks, setFilteredTasks] = useState(props.tasks || []);
    const [tasks, setTasks] = useState(props.tasks || []);
    const [sortType, setSortType] = useState("Oldest");
    const [filterType, setFilterType] = useState('In Progress');

    const sortTypes = ['Newest', 'Oldest', 'Priority', 'Due Date'];
    const filterTypes = ['In Progress', 'Complete', 'All'];

    useEffect(() => {
        async function getTasks() {
            const _tasks = await api.getTasks();
            if (_tasks) {
                setTasks(_tasks);
            } else {
                navigate('/');
            }
        }
        getTasks();
    }, []);

    useEffect(() => {
        if (!window.loggedIn)
            navigate("/");
    }, []);

    const taskList =
        filteredTasks.length === 0
            ? 'there is no task record!'
            : filteredTasks.map((task, k) => <TaskCard task={task} key={k} />);

    // handle filter and sort
    useEffect(() => {
        const filtered = tasks.filter((task) => {
            switch (filterType) {
                case "In Progress":
                    return task.status == "open";
                case "Complete":
                    return task.status == "complete";
                case "All":
                    return true;
                default:
                    return true;
            }
        });

        const sortedTasks = filtered.sort((a,b) => {
            switch (sortType) {
                case "Newest": {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
                case "Oldest": {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }
                case "Priority": {
                    return priorityMap[b.priority] - priorityMap[a.priority];
                }
                case "Due Date": {
                    if (!a.due_date && !b.due_date) return 0;
                    if (!a.due_date && b.due_date) return 1;
                    if (a.due_date && !b.due_date) return -1;

                    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
                }
                default:
                    return 0;
            }
        });
        setFilteredTasks(sortedTasks);
    }, [tasks, filterType, sortType]);

    return (
        <div className='ShowTaskList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Task List</h2>
                    </div>

                    <div className='col-md-12'>
                        <div className="float-end">
                            <select
                                name="Filter"
                                onChange={e => setFilterType(e.target.value)}
                                value={filterType}
                            >
                                {filterTypes.map((_filterType, key) => (
                                    <option key={key} value={_filterType}>
                                        {_filterType}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="Sort"
                                onChange={e => setSortType(e.target.value)}
                                value={sortType}
                            >
                                {sortTypes.map((_sortType, key) => (
                                    <option key={key} value={_sortType}>
                                        {_sortType}
                                    </option>
                                ))}
                            </select>
                            <Link to='/create-task' className='btn btn-outline-warning float-end'>+ Add New Task</Link>
                        </div>

                        <br />
                        <br />
                        <hr />
                    </div>
                </div>

                <div className='list'>{taskList}</div>
            </div>
        </div>
    );
}

export default ShowTaskList;