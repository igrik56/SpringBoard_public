import { render } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders learn react link', () => {
  render(<App />);
});

it('snapshot test', function() {
  const { asFragment } = render(<App />)
  expect(asFragment()).toMatchSnapshot()
})
