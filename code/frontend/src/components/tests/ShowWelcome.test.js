import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ShowWelcome from '../ShowWelcome';

test('renders show welcome', () => {
    render(
        <Router><ShowWelcome/></Router>
    );
    const textElement = screen.getAllByText(/Sign Up/i)[0];
    expect(textElement).toBeInTheDocument();
});
