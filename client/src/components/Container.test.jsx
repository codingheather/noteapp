import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './Container';

jest.mock('./LogoutSignInButton', () => () => <button>Logout/Sign In</button>);

describe('Container', () => {
  it('renders children and navigation links', () => {
    render(
      <Router>
        <Container>
          <div>Test Child</div>
        </Container>
      </Router>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout/Sign In')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});