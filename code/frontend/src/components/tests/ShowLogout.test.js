import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ShowLogout from '../ShowLogout';

test('renders logging out', () => {
    render(
        <Router><ShowLogout/></Router>
    );
    const textElement = screen.getByText(/Logging out/i);
    expect(textElement).toBeInTheDocument();
});
