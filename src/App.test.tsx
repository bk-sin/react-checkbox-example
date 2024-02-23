import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("can select individual countries", () => {
    render(<App />);

    const indiaCheckbox = screen.getByLabelText("India");

    fireEvent.click(indiaCheckbox);
    expect(indiaCheckbox).toBeChecked();
  });

  test("can select and deselect all when 'Select All' is clicked", () => {
    render(<App />);

    const selectAllCheckbox = screen.getByLabelText("Select All");

    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).toBeChecked();

    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).not.toBeChecked();
  });

  test("deselects 'Select All' when an individual country is selected", () => {
    render(<App />);

    const selectAllCheckbox = screen.getByLabelText("Select All");
    fireEvent.click(selectAllCheckbox);

    const indiaCheckbox = screen.getByLabelText("India");
    fireEvent.click(indiaCheckbox);

    expect(selectAllCheckbox).not.toBeChecked();
  });

  test("selects 'Select All' automatically when all countries are selected", () => {
    render(<App />);

    const selectAllCheckbox = screen.getByLabelText("Select All");
    const indiaCheckbox = screen.getByLabelText("India");
    const usaCheckbox = screen.getByLabelText("USA");
    const franceCheckbox = screen.getByLabelText("France");

    fireEvent.click(indiaCheckbox);
    fireEvent.click(usaCheckbox);
    fireEvent.click(franceCheckbox);

    expect(selectAllCheckbox).toBeChecked();
  });
});
