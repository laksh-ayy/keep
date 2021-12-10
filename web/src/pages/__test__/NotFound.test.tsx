import NotFound from "../NotFound";
import { render, screen } from "@testing-library/react";

describe("NotFound Page", () => {
  test("render", () => {
    render(<NotFound />);
    const notFound = screen.getByAltText(
      "Under development"
    ) as HTMLImageElement;
    expect(notFound.src).toContain("undraw_page_not_found_su7k.svg");
  });
});
