import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import AddMoreButton from './AddMoreButton';

describe('AddMoreButton', () => {
  it('navigates to /profile when clicked', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <AddMoreButton />
      </Router>
    );

    fireEvent.click(getByText('Write a new note!'));

    expect(history.location.pathname).toBe('/profile');
  });
});