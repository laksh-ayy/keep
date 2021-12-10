import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "../SignIn";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignIn Page", () => {
  let firstRender: DocumentFragment;
  beforeEach(() => {
    const { asFragment } = render(
      <Router>
        <SignIn />
      </Router>
    );
    firstRender = asFragment();
  });

  it("Form Submit has been successful", () => {
    fireEvent.submit(screen.getByTestId("custom-element"));
    expect(firstRender).toMatchSnapshot();
  });
});
