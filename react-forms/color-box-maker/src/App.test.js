import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('smoke test App', () => {
  render(<App />);
});

it('snapshot test App', function(){
  const {asFragment} = render(<App/>)
  expect (asFragment()).toMatchSnapshot()
})
