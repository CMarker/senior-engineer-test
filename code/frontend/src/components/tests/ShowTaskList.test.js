import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ShowTaskList from '../ShowTaskList';

const tasks = [{
    title: "A task",
    description: "a task to do",
    priority: "normal"
}];

test('renders task list', () => {
    render(
        <Router><ShowTaskList tasks={tasks}/></Router>
    );
    const textElement = screen.getAllByText(/Task List/i)[0];
    expect(textElement).toBeInTheDocument();
});
