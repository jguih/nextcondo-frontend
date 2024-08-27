/** @jest-environment jsdom */
import { Typography } from "@/src/components/typography/typography";
import { render, screen } from "@testing-library/react";

describe("<Typography />", () => {
  it("render a p tag", () => {
    render(<Typography tag="p" />);
    const p = screen.getByRole("paragraph");
    expect(p).toBeInTheDocument();
  });

  it("render a h1 tag", () => {
    render(<Typography tag="h1" />);
    const h1 = screen.getByRole("heading");
    expect(h1).toBeInTheDocument();
  });
});
