import React from "react";
import {render} from '@testing-library/react'
import Box from "./Box";

test('smoke test Box', () => {
    render(<Box />);
  });
  
  it('snapshot test Box', function(){
    const {asFragment} = render(<Box/>)
    expect (asFragment()).toMatchSnapshot()
  })