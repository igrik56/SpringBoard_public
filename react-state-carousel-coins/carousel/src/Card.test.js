import React from 'react'
import {render} from '@testing-library/react'
import Card from './Card'

it('smoke test', () => {
    render(<Card/>)
})

it('snapshot test', () => {
    const {asFragment} = render(<Card/>)
    expect(asFragment()).toMatchSnapshot()
})