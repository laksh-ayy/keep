import { fireEvent, render, screen } from "@testing-library/react";
import NoteInput from "../NoteInput";
import { waitFor } from "@testing-library/react";

describe("NoteInput Page", () => {
  it("render", () => {
    render(<NoteInput />);
    const element = screen.getByText("Take a note...");
    expect(element).toHaveTextContent("Take a note...");
  });

  it("load create note modal", async () => {
    const { getByText, getByTestId, getByPlaceholderText, container } = render(
      <NoteInput />
    );
    fireEvent.click(getByTestId("takeanote"));
    const element = await waitFor(() => getByTestId("createanote"));
    expect(element).toHaveTextContent("Save");
  });
});
