import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import CreateTask from '../CreateTask';

test('renders page', () => {
    render(
        <Router><CreateTask/></Router>
    );
    const textElement = screen.getByText(/Add Task/i);
    expect(textElement).toBeInTheDocument();
});
