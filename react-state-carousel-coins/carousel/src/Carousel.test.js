import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("smoke test", () =>{
  render(<Carousel/>)
})

it('snapshot test', () => {
  const {asFragment} = render(<Carousel/>)
  expect(asFragment()).toMatchSnapshot()
})

it('hidden/visible arrows', () => {
  const {getByTestId} = render(<Carousel/>)
  const leftArrow = getByTestId('left-arrow')
  const rightArrow = getByTestId('right-arrow')


  expect(leftArrow).toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  fireEvent.click(getByTestId('right-arrow'))

  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  fireEvent.click(rightArrow)
  
  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).toHaveClass('hidden')
})

it('works when you click on the right arrow', () => {
  const {getByTestId, queryByAltText} = render(<Carousel/>)
  const leftArrow = getByTestId('left-arrow')
  const rightArrow = getByTestId('right-arrow')

  fireEvent.click(rightArrow)           //go to the second img and after click to comeback.
  fireEvent.click(leftArrow)

  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash'))
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument()
  
})