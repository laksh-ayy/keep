import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../SignUp";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignUp Page", () => {
  let firstRender: DocumentFragment;
  beforeEach(() => {
    const { asFragment } = render(
      <Router>
        <SignUp />
      </Router>
    );
    firstRender = asFragment();
  });

  it("Form Submit has been successful", () => {
    fireEvent.submit(screen.getByTestId("custom-element"));
    expect(firstRender).toMatchSnapshot();
  });
});
