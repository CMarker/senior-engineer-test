import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ShowTaskDetails from '../ShowTaskDetails';

const task = {
    title: "A task",
    priority: "normal"
}

test('renders task details', () => {
    render(
        <Router><ShowTaskDetails task={task}/></Router>
    );
    const textElement = screen.getAllByText(/Priority/i)[0];
    expect(textElement).toBeInTheDocument();
});
