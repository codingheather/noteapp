import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthToken } from '../AuthTokenContext';
import LogoutSignInButton from './LogoutSignInButton';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

jest.mock('../AuthTokenContext', () => ({
  useAuthToken: jest.fn(),
}));

describe('LogoutSignInButton', () => {
  it('navigates to / when not logged in', () => {
    useAuth0.mockReturnValue({ logout: jest.fn() });
    useAuthToken.mockReturnValue({ accessToken: undefined });

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <LogoutSignInButton />
      </Router>
    );

    fireEvent.click(getByText('Sign in'));

    expect(history.location.pathname).toBe('/profile');
  });
});