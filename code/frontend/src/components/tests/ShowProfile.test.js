import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ShowProfile from '../ShowProfile';

const user = {
    email: "a@b.com"
}
test('renders email', () => {
    render(
        <Router><ShowProfile user={user}/></Router>
    );
    const emailElement = screen.getByText(/a@b.com/i);
    expect(emailElement).toBeInTheDocument();
});
