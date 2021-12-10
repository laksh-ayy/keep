import TextBox from "../TextBox";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const note = {
  id: "someid",
  title: "test title",
  body: "test body",
  label: "test label",
};

describe("TextBox Page", () => {
  it("render", () => {
    render(<TextBox {...note} />);
    const textBox = screen.getByText("test title");
    expect(textBox).toBeInTheDocument();
  });

  it("load data", async () => {
    const { getByTestId } = render(<TextBox {...note} />);
    fireEvent.click(getByTestId("card"));
    const element = await waitFor(() => getByTestId("modal"));
    expect(element).toHaveTextContent("test label");
  });

  it("load second modal", async () => {
    const { getByTestId } = render(<TextBox {...note} />);
    fireEvent.click(getByTestId("card"));
    const element = await waitFor(() => getByTestId("modal"));
    fireEvent.click(getByTestId("EditIcon"));
    const modal2 = await waitFor(() => getByTestId("modal2"));
    expect(modal2).toHaveTextContent("Save");
  });
});
