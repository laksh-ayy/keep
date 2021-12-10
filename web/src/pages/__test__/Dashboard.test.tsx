import Dashboard from "../Dashboard";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";

describe("dashboard", () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
  });
  afterEach(() => {
    (global as any).fetch = originFetch;
  });
  it("should pass", async () => {
    const fakeResponse = {};
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;
    const { getByTestId } = render(<Dashboard />);
    const div = await waitFor(() => getByTestId("test"));
    expect(div).toHaveTextContent("");
  });
});
