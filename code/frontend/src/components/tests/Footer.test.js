import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Footer from '../Footer';

test('renders copyright', () => {
    render(
        <Router><Footer/></Router>
    );
    const textElement = screen.getByText(/Copyright/i);
    expect(textElement).toBeInTheDocument();
});
