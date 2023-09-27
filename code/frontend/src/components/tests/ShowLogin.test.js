import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ShowLogin from '../ShowLogin';

test('renders login', () => {
    render(
        <Router><ShowLogin/></Router>
    );
    const textElement = screen.getAllByText(/Login/i)[0];
    expect(textElement).toBeInTheDocument();
});
