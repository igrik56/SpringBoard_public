import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, task = "write tests") {
  const taskInput = todoList.getByLabelText("Task:");
  fireEvent.change(taskInput, { target: { value: task }});
  const submitButton = todoList.getByText("Add a task to the list");
  fireEvent.click(submitButton);
}

it("renders without crashing", function() {
  render(<TodoList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);

  // expect form to clear and todo to be on the page
  expect(list.getByLabelText("Task:")).toHaveValue("");
  expect(list.getByText("write tests")).toBeInTheDocument();
  expect(list.getByText("Edit")).toBeInTheDocument();
  expect(list.getByText("X")).toBeInTheDocument();
});

it("can edit a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);

  fireEvent.click(list.getByText("Edit"));
  const editInput = list.getByDisplayValue("write tests");
  fireEvent.change(editInput, { target: { value: "sleep" }});
  fireEvent.click(list.getByText("Update!"));

  // expect only edited todo to appear
  expect(list.getByText("sleep")).toBeInTheDocument();
  expect(list.queryByText("write tests")).not.toBeInTheDocument();
});

it("can delete a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);

  fireEvent.click(list.getByText("X"));

  // expect todo to be gone
  expect(list.queryByText("write tests")).not.toBeInTheDocument();
});
