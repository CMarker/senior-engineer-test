import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ShowRegister from '../ShowRegister';

test('renders register', () => {
    render(
        <Router><ShowRegister/></Router>
    );
    const textElement = screen.getAllByText(/Register/i)[0];
    expect(textElement).toBeInTheDocument();
});
