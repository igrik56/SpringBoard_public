import React from "react";
import {render, fireEvent} from '@testing-library/react'
import BoxList from "./BoxList";

function addBox (boxList, height=100, width = 100, color = 'black'){

    const heightInput = boxList.getByLabelText('Height')
    const widthInput = boxList.getByLabelText('Width')
    const backgroundColorInput = boxList.getByLabelText('Background Color')
    const button = boxList.getByText('Add a box')

    fireEvent.change(heightInput, {target: {value: height}})
    fireEvent.change(widthInput, {target: {value: width}})
    fireEvent.change(backgroundColorInput, {target: {value: color}})
    fireEvent.click(button)
}

test('smoke test BoxList', () => {
    render(<BoxList />);
  });
  
it('snapshot test BoxList', function(){
const {asFragment} = render(<BoxList/>)
expect (asFragment()).toMatchSnapshot()
})


it('adding a new box', function (){
    const boxList = render(<BoxList/>)

    //checking if there is any box. At start has to be empty.
    expect(boxList.queryByText('X')).not.toBeInTheDocument()

    //adding a box
    addBox(boxList)

    //expecting to see the default box. 
    //Looking for the x button. 
    //Cause it is the only text that is in the box.

    const removeButton = boxList.getByText('X')

    expect(removeButton).toBeInTheDocument()

    expect(removeButton.parentElement.parentElement).toHaveStyle(`
        height: 100px;
        width: 100px;
        background-color: black;`)
})

it('remove a box', function (){
    const boxList = render(<BoxList />)
    addBox(boxList)

    //checking if the box was created.
    const removeButton = boxList.getByText('X')
    expect(removeButton).toBeInTheDocument()    
    
    //clicking the button and expecting the box to be removed.
    fireEvent.click(removeButton)
    expect(removeButton).not.toBeInTheDocument()
})