import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import TaskCard from '../TaskCard';

const task = {
    title: "A task",
    description: "a task to do",
    priority: "normal"
};

test('renders task card', () => {
    render(
        <Router><TaskCard task={task}/></Router>
    );
    const textElement = screen.getAllByText(/A task/i)[0];
    expect(textElement).toBeInTheDocument();
});
