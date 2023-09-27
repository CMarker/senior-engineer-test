import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import UpdateTaskInfo from '../UpdateTaskInfo';

const task = {
    title: "A task",
    description: "a task to do",
    priority: "normal"
};

test('renders update task', () => {
    render(
        <Router><UpdateTaskInfo task={task}/></Router>
    );
    const textElement = screen.getAllByText(/A task/i)[0];
    expect(textElement).toBeInTheDocument();
});
