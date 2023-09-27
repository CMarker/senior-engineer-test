import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from '../Header';

test('renders Home', () => {
    render(
        <Router><Header/></Router>
    );
    const textElement = screen.getByText(/Home/i);
    expect(textElement).toBeInTheDocument();
});
